from locations.models import Location
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, mixins
from .serializers import LocationSerializer
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .utils import convertE7coord
import datetime
import googlemaps
from decouple import config
from .contact_tracer import getUserLocationWithCluster

#Location Filter
class LocationFilter(filters.FilterSet):
    startTime = filters.DateTimeFromToRangeFilter()
    endTime =  filters.DateTimeFromToRangeFilter()
    ordering = filters.OrderingFilter(
        # tuple-mapping retains order
        fields=(
            ('startTime', 'time'),
        ),

        # labels do not need to retain order
        field_labels={
            'time': 'Time',
        }
    )

    class Meta:
        model = Location
        fields = ['startTime', 'endTime']

# Location Viewset
class LocationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LocationSerializer
    filterset_class = LocationFilter

    def get_queryset(self):
        return self.request.user.locations.all()

    def create(self, request, *args, **kwargs):
        # Create a list of dict with valid key - value for location model
        locations = request.data["timelineObjects"]
        user_locations = []
        for local in locations:
            if "placeVisit" in local:
                new_local = dict()
                new_local["name"] = local["placeVisit"]["location"]["name"]
                new_local["placeId"] = local["placeVisit"]["location"]["placeId"]
                new_local["latitude"] = convertE7coord(local["placeVisit"]["location"]["latitudeE7"])
                new_local["longitude"] = convertE7coord(local["placeVisit"]["location"]["longitudeE7"])
                epoch = int(local["placeVisit"]["duration"]["startTimestampMs"])/1000
                new_local["startTime"] =  datetime.datetime.utcfromtimestamp(epoch).replace(tzinfo=datetime.timezone.utc)
                epoch = int(local["placeVisit"]["duration"]["endTimestampMs"])/1000
                new_local["endTime"] = datetime.datetime.utcfromtimestamp(epoch).replace(tzinfo=datetime.timezone.utc)
                new_local["infected"] = False
                new_local["notified"] = False
                serializer = self.get_serializer(data=new_local)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                user_locations.append(serializer.data)
        
        # get contacts
        start = user_locations[0]["startTime"]
        end = user_locations[-1]["endTime"]
        query = Location.objects.all().filter(startTime__gte=start, endTime__lte=end).order_by("startTime")
        all_serializer = LocationSerializer(query, many=True)
        locations = getUserLocationWithCluster(self.request.user, query, all_serializer.data)
        return Response(locations)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    # Return details provied by google places api
    @action(methods=['get'], detail=True)
    def place_details(self, request, pk=None):
        gmaps = googlemaps.Client(key=config("GOOGLE_API_KEY"))
        place = gmaps.place(place_id=pk)
        return Response(place)



# UserLocationCluster ViewSet - For getting user locations with cluster info
class UserLocationClusterViewSet(viewsets.ViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # Return user locations with clusters informations
    def list(self, request):
        # Get query param
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")
        # Get all locations
        query = Location.objects.all().filter(startTime__gte=start, endTime__lte=end).order_by("startTime")

        if not query:
            return Response([])

        # Serialize
        serializer = LocationSerializer(query, many=True)
    
        locations = getUserLocationWithCluster(self.request.user , query, serializer.data)
        return Response(locations)


# LocationCluster ViewSet - all locations with cluster info (no info about users)
class LocationClusterViewSet(viewsets.ViewSet):

    # Return all locations with clusters informations
    def list(self, request):
        # Get query param
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")
        # Get all locations
        query = Location.objects.all().filter(startTime__gte=start, endTime__lte=end)
        # Serialize
        serializer = LocationSerializer(query, many=True)
        locations = getLocationWithCluster(query, serializer.data)
        return Response(locations)

    