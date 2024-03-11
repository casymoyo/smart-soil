import logging
from django.shortcuts import render
from sensors.serializer import SoilMoistureSerializer, pHSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from sensors.models import SoilMoistureSensor, pHSensor
from rest_framework import status



class SoilMoistureView(ModelViewSet):
    serializer_class = SoilMoistureSerializer
    logger = logging.getLogger('soil_moisture') 
    
    def get_queryset(self):
        self.logger.info('Retrieved all soil moisture data')
        return SoilMoistureSensor.objects.all()  
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.logger.debug('Saving validated soil moisture data') 
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class pHView(ModelViewSet):
    serializer_class = pHSerializer
    logger = logging.getLogger('ph_sensor') 
    
    def get_queryset(self):
        self.logger.info('ph data')
        return pHSensor.objects.all()  
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.logger.debug('Saving validated ph data') 
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    

