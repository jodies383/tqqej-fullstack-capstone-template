from django.urls import path
from .views import (
    DealershipListAPIView,
    DealershipDetailAPIView,
    ReviewCreateAPIView,
    SignupAPIView,
    LoginAPIView,
    LogoutAPIView,
    CarMakeListAPIView,
    CarModelListAPIView,
    SentimentAPIView,
)

urlpatterns = [
    path('dealerships/', DealershipListAPIView.as_view(), name='dealership-list'),
    path('dealerships/<int:pk>/', DealershipDetailAPIView.as_view(), name='dealership-detail'),
    path('reviews/', ReviewCreateAPIView.as_view(), name='review-create'),
    path('auth/signup/', SignupAPIView.as_view(), name='signup'),
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('auth/logout/', LogoutAPIView.as_view(), name='logout'),
    path('car-makes/', CarMakeListAPIView.as_view(), name='car-makes'),
    path('car-models/', CarModelListAPIView.as_view(), name='car-models'),
    path('sentiment/', SentimentAPIView.as_view(), name='sentiment'),
]
