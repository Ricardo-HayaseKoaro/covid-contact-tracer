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


#Location Filter

class LocationFilter(filters.FilterSet):
    startTime = filters.DateTimeFromToRangeFilter()
    endTime =  filters.DateTimeFromToRangeFilter()

    class Meta:
        model = Location
        fields = ['startTime', 'endTime']

# Location Viewset

class LocationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LocationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
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


    @action(methods=['get'], detail=True)
    def place_details(self, request, pk=None):
        gmaps = googlemaps.Client(key=config("GOOGLE_API_KEY"))
        place = gmaps.place(place_id=pk)
        return Response(place)


