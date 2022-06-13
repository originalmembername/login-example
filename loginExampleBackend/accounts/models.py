""" from django.db import models

from django.contrib.auth.models import AbstractUser, User


# Create your models here.
class CustomUser(AbstractUser):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customUser')
    city = models.CharField(max_length=100, default="")
 """