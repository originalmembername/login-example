from email import message
import logging

from django.http import JsonResponse
# from django.shortcuts import render

# Create your views here.
def login(request):
    logging.debug("Request: %s", request)
    return JsonResponse({'message': 'Request accepted'})
