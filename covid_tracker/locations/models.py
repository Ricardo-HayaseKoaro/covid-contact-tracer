from django.db import models

class Location(models.Model):
    placeId = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    startTimestamp = models.CharField(max_length=100)
    endTimestamp = models.CharField(max_length=100)