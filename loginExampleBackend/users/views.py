import json
from django.db import IntegrityError
from django.http import HttpResponseForbidden, JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from users.models import User
from users.serializers import CurrentUserSerializer

#returns user data
class UserView(APIView):
    serializer_class = CurrentUserSerializer
 #   authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    # get user data for this user
    def get(self, request):
        user = request.user
        serializer = CurrentUserSerializer(user)
        user_json = serializer.data
        return JsonResponse(user_json, safe=False)


class UserCreationView(APIView):
    # create new user
    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        if username == "":
            username = None
        city = request.data.get('city')
        if city == "":
            city = None
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        # Check if user already exists?
        try:
            user = User.objects.create_user(email=email,
                                            username=username,
                                            first_name=first_name,
                                            last_name=last_name,
                                            city=city,
                                            password=password)
            user.save()
        except IntegrityError:
            # User already exists
            return HttpResponseForbidden(json.dumps("{message: 'User already exists'}"), content_type='application/json')
        # confirm creation of user
        return JsonResponse({
            'message': "User created successfully: " + email
        })
