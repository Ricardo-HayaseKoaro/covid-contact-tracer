from notifications.models import Notification
from locations.models import Location
from rest_framework import viewsets, mixins, status
from .serializers import NotificationSerializer, CreateNotificationSerializer
from rest_framework.response import Response
from .utils import email_notification
from .permission import IsOwner
from rest_framework import permissions

class NotificationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin):

    permission_classes = [
        IsOwner,
        permissions.IsAuthenticated,
    ]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.notifications.all().order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateNotificationSerializer
        else:
            return NotificationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

        
       