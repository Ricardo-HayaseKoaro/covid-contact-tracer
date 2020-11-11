from rest_framework import routers
from .api import LocationViewSet

router = routers.DefaultRouter()

router.register('api/locations', LocationViewSet, 'locations')

urlpatterns = router.urls