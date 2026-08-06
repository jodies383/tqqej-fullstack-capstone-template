from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Dealership, Review, CarMake, CarModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user


class CarMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarMake
        fields = ['id', 'name']


class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = ['id', 'name', 'year', 'make']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'name', 'dealership', 'review', 'time', 'purchase', 'purchase_date', 'car_make', 'car_model', 'car_year']
        read_only_fields = ['id', 'user', 'time']


class DealershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealership
        fields = ['id', 'name', 'address', 'city', 'state', 'zip_code', 'phone']


class DealershipDetailSerializer(DealershipSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta(DealershipSerializer.Meta):
        fields = DealershipSerializer.Meta.fields + ['reviews']
