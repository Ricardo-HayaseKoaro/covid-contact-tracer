from django.db import models
from django.contrib.auth.models import User
from locations.models import Location


class Notification(models.Model):
    user = models.ForeignKey(User, related_name="notifications", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    notifier = models.BooleanField()
    visualized = models.BooleanField()
    location = models.ForeignKey(Location, related_name="notifications", on_delete=models.CASCADE)
