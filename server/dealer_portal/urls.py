from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.authtoken import views as token_views
from dealerships.views import (
    logout_user, legacy_login, legacy_logout, fetch_dealers, fetch_dealer,
    fetch_reviews, legacy_cars, legacy_analyze,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("dealerships.urls")),
    path("api-token-auth/", token_views.obtain_auth_token),
    path("api-auth/logout/", logout_user),
    path("djangoapp/login", legacy_login),
    path("djangoapp/logout", legacy_logout),
    path("djangoapp/get_cars", legacy_cars),
    path("fetchDealers", fetch_dealers),
    path("fetchDealers/<str:state>", fetch_dealers),
    path("fetchDealer/<int:dealer_id>", fetch_dealer),
    path("fetchReviews/dealer/<int:dealer_id>", fetch_reviews),
    path("analyze/<str:review>", legacy_analyze),
    path("", RedirectView.as_view(url="http://localhost:3000/", permanent=False)),
]
