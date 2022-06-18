import json
from django.db import IntegrityError
from django.http import HttpResponseForbidden, JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from users.models import User


class UserView(APIView):
 #   authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    # get user data for this user
    def get(self, request):
        user = request.user
        user_data = {
            'username': user.username,
            'email': user.email,
            'city': user.city
        }
        return JsonResponse(user_data, safe=False)


class UserCreationView(APIView):
    # create new user
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        city = request.data.get('city')
        password = request.data.get('password')
        # Check if user already exists?
        # catch django.db.utils.IntegrityError:
        try:
            user = User.objects.create_user(username=username,
                                            email=email,
                                            city=city,
                                            password=password)
            user.save()
        except IntegrityError:
            # User already exists
            return HttpResponseForbidden(json.dumps("{message: 'User already exists'}"), content_type='application/json')
        # confirm creation of user
        return JsonResponse({
            'message': "User created successfully: " + username
        })
