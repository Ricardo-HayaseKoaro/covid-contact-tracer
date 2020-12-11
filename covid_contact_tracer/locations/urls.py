from rest_framework import routers
from .api import LocationViewSet, UserLocationClusterViewSet, LocationClusterViewSet

router = routers.DefaultRouter()

router.register('api/locations', LocationViewSet, 'locations')
router.register('api/user_clusters', UserLocationClusterViewSet, 'clusters')
router.register('api/clusters', LocationClusterViewSet, 'locations')

urlpatterns = router.urls