import json
from django.db import IntegrityError
from django.http import HttpResponseForbidden, JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
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
    serializer_class = CurrentUserSerializer
    # create new user
    def post(self, request):
        serializer = CurrentUserSerializer()
        try:
            serializer.create(request.data)
        except IntegrityError:
            # User already exists
            return HttpResponseForbidden(json.dumps("{message: 'User already exists'}"), content_type='application/json')
        # confirm creation of user
        return JsonResponse({
            'message': "User created successfully: " + request.data.get('email')
        })
                
