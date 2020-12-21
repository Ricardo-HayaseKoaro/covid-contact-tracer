from notifications.models import Notification
from locations.models import Location
from rest_framework import viewsets, permissions, mixins
from .serializers import NotificationSerializer
from rest_framework.response import Response
from .utils import email_notification


class NotificationViewSet(viewsets.ViewSet, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.notifications.all()

    def create(self, request, *args, **kwargs):
        locations = Location.objects.filter(pk__in=[request.clusters])
        notifications = []
        for location in locations:
            location.infected = True
            if request.user == location.owner:
                notification = Notification(user=location.owner, notifier=True)
            else:
                notification = Notification(user=location.owner, notifier=False)
            notifications.append(notification)
        Location.objects.bulk_update(locations, ["infected"])
        Notification.objects.bulk_create(notifications)
        # email_notification(locations)       
        return Response()
        