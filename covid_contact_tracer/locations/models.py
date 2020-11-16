from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    placeId = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    owner = models.ForeignKey(User, related_name="locations", on_delete=models.CASCADE, null=True)
    