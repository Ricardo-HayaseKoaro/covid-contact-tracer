from rest_framework import serializers
from locations.models import Location 
from notifications.models import Notification
from rest_framework.validators import UniqueValidator


# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notification 
    fields = ['notifier', 'id', 'created_at']

# Location Serializer
class LocationSerializer(serializers.ModelSerializer):
  notifications = NotificationSerializer(many=True, required=False)

  class Meta:
    model = Location 
    fields = '__all__'


