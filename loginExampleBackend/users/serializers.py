from rest_framework import serializers
from .models import CustomUserManager, User


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
