from notifications.models import Notification
from rest_framework import viewsets, permissions, mixins
from .serializers import NotificationSerializer


class NotificationViewSet(ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.notifications.all()
