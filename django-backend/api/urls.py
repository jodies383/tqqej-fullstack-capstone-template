from django.urls import path
from .views import DealershipListAPIView, DealershipDetailAPIView, ReviewCreateAPIView, SignupAPIView

urlpatterns = [
    path('dealerships/', DealershipListAPIView.as_view(), name='dealership-list'),
    path('dealerships/<int:pk>/', DealershipDetailAPIView.as_view(), name='dealership-detail'),
    path('reviews/', ReviewCreateAPIView.as_view(), name='review-create'),
    path('auth/signup/', SignupAPIView.as_view(), name='signup'),
]
