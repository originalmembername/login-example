from django.urls import path
from .views import LogoutViewEx, EmailTokenObtainPairView


urlpatterns = [
  path('login/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('logout/', LogoutViewEx.as_view(), name='logout'),
]
