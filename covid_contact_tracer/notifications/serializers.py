from rest_framework import serializers
from notifications.models import Notification 
from locations.models import Location
from locations.serializers import LocationSerializer 

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
  location = LocationSerializer()
  class Meta:
    model = Notification 
    fields = "__all__"

# Crete Notification Serializer
class CreateNotificationSerializer(serializers.ModelSerializer):
  id = serializers.IntegerField()
  contacts = serializers.ListField(
   child=serializers.IntegerField(), write_only=True)
  cluster_id = serializers.IntegerField(write_only=True)

  class Meta:
    model = Location 
    fields = "__all__"
  
  def validate_notified(self, value):
    if value:
        raise serializers.ValidationError(
            {"notified": "Location already notified"})
    return value

  def create(self, validated_data):
    locations_contacted = Location.objects.filter(pk__in=validated_data["contacts"])
    notifications = []
    for location in locations_contacted:
      location.infected = True
      notifier = False
      # Validation necessary because user can upload same locations more than once
      if location.owner == self.context['request'].user:
        notifier = True
      notification = Notification(user=location.owner, notifier=notifier, visualized=False, location=location)
      notifications.append(notification)
    Location.objects.bulk_update(locations_contacted, ["infected"])

    # Creating user notification
    validated_data["notified"] = True
    validated_data["infected"] = True
    fields_to_pop = ["cluster_id", "contacts"]
    for field in fields_to_pop:
      validated_data.pop(field)
    user_location = Location(**validated_data)
    user_location.save()
    
    # Create user notification
    notifications.append(Notification(user=validated_data["owner"], notifier=True, visualized=False, location=user_location))
    return Notification.objects.bulk_create(notifications)






  