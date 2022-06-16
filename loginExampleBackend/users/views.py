from django.core import serializers
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class UserView(APIView):
 #   authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    #get user data for this user
    def get(self, request):
        user = request.user
        #serialize user data (is there any less awkward way?)
        #[-1] means last element
#       user_data = serializers.serialize('json', [user,], fields=('username','email','city'))[1:-1]
        user_data = {
            'username': user.username,
            'email': user.email,
            'city': user.city
        }
        return JsonResponse(user_data, safe=False)
        