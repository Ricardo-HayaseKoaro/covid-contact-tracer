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
from .contact_tracer import getLocationWithCluster

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
        resp = []
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
                serializer = self.get_serializer(data=new_local)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                resp.append(serializer.data)
        return Response(resp)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    # Return details provied by google places api
    @action(methods=['get'], detail=True)
    def place_details(self, request, pk=None):
        gmaps = googlemaps.Client(key=config("GOOGLE_API_KEY"))
        place = gmaps.place(place_id=pk)
        return Response(place)



#Cluster ViewSet
class ClusterViewSet(viewsets.GenericViewSet):

    # Return clusters information
    def list(self, request, *args, **kwargs):
        clusters = getLocationWithCluster(self.request.user)
        return Response(clusters)
