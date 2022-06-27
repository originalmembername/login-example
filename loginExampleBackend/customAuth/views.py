from rest_framework.authentication import TokenAuthentication
from knox.views import LogoutView

class LogoutViewEx(LogoutView):
    authentication_classes = (TokenAuthentication,)

# Remove token for this user
""" def logout(request):
    token = request.user.auth_token
    if token:
        #token was successfully deleted, respond with 200
        token.delete()
        return JsonResponse({'message': 'Token was deleted successfully'})
    #there is no such token, return 404 error
    return HttpResponseNotFound("No token found for this request") """
