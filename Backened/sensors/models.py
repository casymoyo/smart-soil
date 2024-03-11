from django.db import models

class SoilMoistureSensor(models.Model):
    value = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.created} -> {self.value}'

class pHSensor(models.Model):
    value = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.created} -> {self.value}'
    