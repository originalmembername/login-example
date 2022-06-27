from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.views import APIView
from knox.views import LogoutView

class LoginView(APIView):
    def post(self, request):
        return obtain_auth_token(request)

class LogoutViewEx(LogoutView):
    authentication_classes = (TokenAuthentication,)
