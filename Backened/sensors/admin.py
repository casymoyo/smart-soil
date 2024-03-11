from django.contrib import admin
from sensors.models import SoilMoistureSensor, pHSensor
# Register your models here.
admin.site.register(SoilMoistureSensor)
admin.site.register(pHSensor)