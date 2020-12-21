from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    user = models.ForeignKey(User, related_name="notifications", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    notifier = models.BooleanField()
    visualized = models.BooleanField()

