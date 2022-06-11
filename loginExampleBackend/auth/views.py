import logging

from django.http import JsonResponse
# from django.shortcuts import render

# Create your views here.
def login(request):
    logging.debug("Request: %s", request)
    response = JsonResponse({'message': 'Request accepted'})

    return response
