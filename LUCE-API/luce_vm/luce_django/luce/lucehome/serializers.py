from accounts.models import User, Cause, Donation
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "ethereum_public_key", "first_name", "last_name", "user_type"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "ethereum_public_key", "ethereum_private_key", "password", "first_name", "last_name", "user_type"]
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

class CauseSerializer(serializers.ModelSerializer):
    creator_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta: 
        model = Cause
        fields = ["id", "title", "description", "ethereum_public_key", "ethereum_private_key", "goal", "creator_id"]

    def create(self, validated_data):
        user = self.context["request"].user
        cause = Cause.objects.create( creator = user,  **validated_data)
        return cause
    def validate(self,data):
        user = self.context["request"].user
        user_serializer = UserSerializer(user)
        usertype = user_serializer["user_type"].value

        #only influencers can create causes
        if usertype != 0:   
            raise serializers.ValidationError({"error":"Donors cannot create causes"})
        return data

class PublicCauseSerializer(serializers.ModelSerializer):
    creator_id = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Cause
        fields =  ["id", "title", "description", "ethereum_public_key", "goal", "creator_id"]

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [ "cause", "amount", "donor"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["donor"] = user
        donation = Donation.objects.create(**validated_data)
        return donation
    

 
