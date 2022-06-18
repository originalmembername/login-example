from django.urls import path
from .views import UserCreationView, UserView

urlpatterns = [
    path('', UserView.as_view()),
    path('create/', UserCreationView.as_view())
]
