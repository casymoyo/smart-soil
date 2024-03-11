from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SoilMoistureView, pHView
router = DefaultRouter()
router.register('soil-moisture', SoilMoistureView, basename='soil-moisture')
router.register('ph', pHView, basename='ph')

urlpatterns = [
    path('', include(router.urls)),
]
