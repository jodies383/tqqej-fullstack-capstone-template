from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Dealer, Review, CarMake, CarModel

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Review
        fields = ["id", "username", "rating", "text", "sentiment", "created_at"]

class DealerSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Dealer
        fields = ["id", "name", "city", "state", "address", "phone", "image_url", "reviews"]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {"password":{"write_only":True}}
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = ["id", "name", "make"]

class CarMakeSerializer(serializers.ModelSerializer):
    models = CarModelSerializer(many=True, read_only=True)
    class Meta:
        model = CarMake
        fields = ["id", "name", "models"]
