from django.contrib import admin
from locations.models import Location
from notifications.models import Notification

admin.site.register(Location)
admin.site.register(Notification)

