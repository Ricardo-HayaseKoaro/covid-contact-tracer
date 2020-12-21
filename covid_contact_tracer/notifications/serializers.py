from rest_framework import serializers
from notifications.models import Notification 
from locations.serializers import LocationSerializer 

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
  location = LocationSerializer(read_only=True)
  class Meta:
    model = Notification 
    fields = "__all__"