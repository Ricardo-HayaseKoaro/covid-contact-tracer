from locations.models import Location
from rest_framework.decorators import action
from rest_framework import viewsets, mixins, generics, permissions, status
from .serializers import LocationSerializer
from rest_framework.response import Response
from django_filters import rest_framework as filters
from decouple import config
from .contactTracer import getContacts
from .permission import IsOwner
import googlemaps

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
class LocationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwner,
    ]
    filterset_class = LocationFilter

    serializer_class = LocationSerializer

    def get_queryset(self):
        return self.request.user.locations.all()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # get contacts
        start = serializer.data[0]["startTime"]
        end = serializer.data[-1]["endTime"]
        # get all locations to search for a contact
        query = Location.objects.all().filter(startTime__gte=start, endTime__lte=end).order_by("startTime")
        all_serializer = LocationSerializer(query, many=True)
        locations = getContacts(self.request.user, query, all_serializer.data)

        return Response(locations, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 

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
        locations = getContacts(self.request.user , query, serializer.data)
        return Response(locations)


    # Return details provied by google places api
    @action(methods=['get'], detail=True)
    def place_details(self, request, pk=None):
        gmaps = googlemaps.Client(key=config("GOOGLE_API_KEY"))
        place = gmaps.place(place_id=pk)
        return Response(place)



    