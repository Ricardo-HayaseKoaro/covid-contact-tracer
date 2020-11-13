from locations.models import Location
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, mixins
from .serializers import LocationSerializer
from rest_framework.response import Response
from .utils import convertE7coord
import datetime

# Location Viewset

class LocationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def create(self, request, *args, **kwargs):
         # Create a list of dict with valid key - value for location model
        locations = request.data["timelineObjects"]
        resp = []
        for local in locations:
            if "placeVisit" in local:
                aux_local = dict()
                aux_local["name"] = local["placeVisit"]["location"]["name"]
                aux_local["placeId"] = local["placeVisit"]["location"]["placeId"]
                aux_local["latitude"] = convertE7coord(local["placeVisit"]["location"]["latitudeE7"])
                aux_local["longitude"] = convertE7coord(local["placeVisit"]["location"]["longitudeE7"])
                epoch = int(local["placeVisit"]["duration"]["startTimestampMs"])/1000
                aux_local["startTime"] =  datetime.datetime.utcfromtimestamp(epoch).replace(tzinfo=datetime.timezone.utc)
                epoch = int(local["placeVisit"]["duration"]["endTimestampMs"])/1000
                aux_local["endTime"] = datetime.datetime.utcfromtimestamp(epoch).replace(tzinfo=datetime.timezone.utc)
                serializer = self.get_serializer(data=aux_local)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                resp.append(serializer.data)
        return Response(resp)

    def perform_create(self, serializer):
        serializer.save()
    
    
