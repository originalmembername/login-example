import json
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import HttpResponseBadRequest
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from knox.views import LogoutView
from users.models import User
from users.serializers import CurrentUserSerializer


class LoginView(APIView):
    serializer_class = CurrentUserSerializer

    def post(self, request):
        # get username/email and password
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        serializer = CurrentUserSerializer()
        user = None
        try:
            user = serializer.get_user(username_or_email=username_or_email)
        except User.DoesNotExist:
            return HttpResponseBadRequest(json.dumps("{message: 'No such user'}"))

        # check password
        if not user.check_password(password):
            return HttpResponseBadRequest(json.dumps("{message: 'Password incorrect'}"))
        # find or create token
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'created': created})


class LogoutViewEx(LogoutView):
    authentication_classes = (TokenAuthentication,)
