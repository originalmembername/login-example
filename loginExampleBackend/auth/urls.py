from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [
  path('login2/', views.login, name='login'),
  path('login/', obtain_auth_token, name='login')
]
