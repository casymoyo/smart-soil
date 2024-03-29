from django.conf import settings
from django.dispatch import receiver
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser, BaseUserManager
from rest_framework.authtoken.models import Token

class User(AbstractUser):
    is_admin = models.BooleanField(null=True, default=False)
    
    def __str__(self):
        return self.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)  
