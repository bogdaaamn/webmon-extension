from accounts.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "ethereum_public_key", "ethereum_private_key", "password", "first_name", "last_name", "user_type"]
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        user = super(UserSerializer, self).create(validated_data)
        return user
    def validate(self, data):
        return data

#This serializer purpose is to validate the contract deployer API route
class ContractSerializer(serializers.Serializer):
    user_type = serializers.IntegerField()
    def validate(self, data):
        return data


