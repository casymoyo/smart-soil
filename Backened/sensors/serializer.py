from rest_framework import serializers
from sensors.models import SoilMoistureSensor, pHSensor

class SoilMoistureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilMoistureSensor
        fields = ['value', 'created']

class pHSerializer(serializers.ModelSerializer):
    class Meta:
        model = pHSensor
        fields = ['value', 'created']