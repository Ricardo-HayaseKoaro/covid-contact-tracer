from rest_framework import routers
from .api import LocationViewSet, ClusterViewSet

router = routers.DefaultRouter()

router.register('api/locations', LocationViewSet, 'locations')
router.register('api/clusters', ClusterViewSet, 'clusters')


urlpatterns = router.urls