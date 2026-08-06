from django.db.models import Prefetch, Q
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Dealership, Review
from .serializers import DealershipSerializer, DealershipDetailSerializer, ReviewSerializer, SignupSerializer, UserSerializer


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
