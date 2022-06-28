from django.urls import path
from .views import LogoutViewEx, LoginView


urlpatterns = [
  path('login/', LoginView.as_view(), name='login'),
  path('logout/', LogoutViewEx.as_view(), name='logout'),
]
