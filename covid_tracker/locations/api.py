from locations.models import Location
from rest_framework import viewsets, permissions
from .serializers import LocatlionSerializer

# Location Viewset

class LocationViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = LocatlionSerializer

    queryset = Location.objects.all()