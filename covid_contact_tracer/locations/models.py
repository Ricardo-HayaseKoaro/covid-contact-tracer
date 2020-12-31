from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    placeId = models.CharField(max_length=200)
    name = models.CharField(max_length=200, default="undefined")
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    startTime = models.DateTimeField(null=False)
    endTime = models.DateTimeField(null=False)
    owner = models.ForeignKey(User, related_name="locations", on_delete=models.CASCADE, null=True)
    infected = models.BooleanField(blank=True, default=False)
    notified = models.BooleanField(blank=True, default=False)

    