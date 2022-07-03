import json
from django.http import HttpResponseBadRequest
from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from .models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'city')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data.get('email'),
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            city=validated_data.get('city'),
            password=validated_data.get('password')
        )
        user.save()
        return user

    def get_user(self, username_or_email):
        is_email = True
        # check if request is username or email
        try:
            validate_email(username_or_email)
        except ValidationError:
            # must be username
            is_email = False

        users = get_user_model()
        # get user via email or username; throws Does Not Exist Exception if User doesn't exist
        user = users.objects.get(email=username_or_email) if is_email else users.objects.get(
            username=username_or_email)
        return user
