from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DealerViewSet, CarMakeViewSet, CarModelViewSet, signup, dealer_reviews, create_review, analyze_review
router = DefaultRouter()
router.register("dealerships", DealerViewSet, basename="dealership")
router.register("carmakes", CarMakeViewSet, basename="car-make")
router.register("carmodels", CarModelViewSet, basename="car-model")
urlpatterns = [
    path("", include(router.urls)), path("auth/signup/", signup),
    path("dealerships/<int:dealer_id>/reviews/", dealer_reviews),
    path("reviews/", create_review), path("analyze-review/", analyze_review),
]
