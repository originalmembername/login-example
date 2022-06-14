from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager


class User(AbstractUser):
    city = models.CharField(max_length=50, null=True)

    def _str_(self):
        return self.username + " from " + self.city

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, city=None):
      
        now = timezone.now()
        
        if not username:
            raise ValueError('The given username must be set')
        email = UserManager.normalize_email(email)
        user = self.model(username=username, email=email,city=city,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, date_joined=now)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None,city=None):
        now = timezone.now()
        if not username:
            raise ValueError('The given username must be set')
        email = UserManager.normalize_email(email)
        user = self.model(username=username, email=email,city=city,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, date_joined=now)
        user.set_password(password)
        user.save(using=self._db)
        return user
