from rest_framework.authentication import TokenAuthentication
from knox.views import LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import TokenObtainPairSerializer

class LogoutViewEx(LogoutView):
    authentication_classes = (TokenAuthentication,)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
