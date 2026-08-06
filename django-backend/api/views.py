import json
import os
import subprocess
import sys
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.db.models import Prefetch, Q
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Dealership, Review, CarMake, CarModel
from .serializers import DealershipSerializer, DealershipDetailSerializer, ReviewSerializer, SignupSerializer, UserSerializer, LoginSerializer, CarMakeSerializer, CarModelSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class DealershipListAPIView(generics.ListAPIView):
    serializer_class = DealershipSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        qs = Dealership.objects.all()
        state = self.request.query_params.get('state')
        if state and state.lower() != 'all':
            qs = qs.filter(state__iexact=state)

        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(
                Q(name__icontains=search) |
                Q(city__icontains=search) |
                Q(state__icontains=search) |
                Q(address__icontains=search)
            )
        return qs


class DealershipDetailAPIView(generics.RetrieveAPIView):
    queryset = Dealership.objects.all()
    serializer_class = DealershipDetailSerializer

    def get_queryset(self):
        return super().get_queryset().prefetch_related(
            Prefetch('reviews', queryset=Review.objects.order_by('-time'))
        )


class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SignupAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': UserSerializer(user).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(request, username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user is not None:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user': UserSerializer(user).data, 'detail': 'Logged in successfully.'})
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out successfully.'})


class CarMakeListAPIView(generics.ListAPIView):
    queryset = CarMake.objects.all().order_by('name')
    serializer_class = CarMakeSerializer


class CarModelListAPIView(generics.ListAPIView):
    queryset = CarModel.objects.all().order_by('name')
    serializer_class = CarModelSerializer


class SentimentAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({'detail': 'text is required.'}, status=status.HTTP_400_BAD_REQUEST)

        script = os.path.join(settings.BASE_DIR, '..', 'sentiment', 'index.js')
        proc = subprocess.run([sys.executable, script, text], capture_output=True, text=True, check=False)
        if proc.returncode != 0:
            return Response({'detail': 'Sentiment analysis failed.', 'error': proc.stderr}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            payload = json.loads(proc.stdout)
        except json.JSONDecodeError:
            payload = {'result': proc.stdout.strip()}

        return Response(payload)
