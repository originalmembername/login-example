from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager
from django.utils.translation import gettext as _


# define methods for users like create
class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, username=None, city=None):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = UserManager.normalize_email(email)
        user = self.model(email=email, username=username, city=city,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, date_joined=now)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, username=None, city=None):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = UserManager.normalize_email(email)
        user = self.model(email=email, username=username, city=city,
                          is_staff=True, is_active=True, is_superuser=True,
                          last_login=now, date_joined=now)
        user.set_password(password)
        user.save(using=self._db)
        return user


# user model
class User(AbstractUser):
    city = models.CharField(max_length=50, null=True)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=50, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def _str_(self):
        return self.email
