from notifications.models import Notification
from locations.models import Location
from rest_framework import viewsets, permissions, mixins
from .serializers import NotificationSerializer
from rest_framework.response import Response
from .utils import email_notification


class NotificationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.notifications.all()

    def create(self, request, *args, **kwargs):
        user_location_aux = request.data["location"]
        locations = Location.objects.filter(pk__in=user_location_aux["contacts"])
        notifications = []
        # User that created the notification
        user_location = Location.objects.get(pk=user_location_aux["id"])
        # Check if the user has already notified this place
        if user_location.notified == True:
            return Response({message: "Location already notified"})
        user_location.infected = True
        user_location.notified = True
        user_location.save()
        notification = Notification(user=request.user, notifier=True, visualized=False, location=user_location)
        notifications.append(notification)
        for location in locations:
            location.infected = True
            notification = Notification(user=location.owner, notifier=False, visualized=False, location=location)
            notifications.append(notification)
        Location.objects.bulk_update(locations, ["infected"])
        Notification.objects.bulk_create(notifications)
        # email_notification(locations)       
        return Response()
        