from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import LogoutViewEx


urlpatterns = [  
  path('login/', obtain_auth_token, name='login'),
  path('logout/', LogoutViewEx.as_view(), name='logout'),
]
