from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.authtoken import views as token_views
from dealerships.views import logout_user

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("dealerships.urls")),
    path("api-token-auth/", token_views.obtain_auth_token),
    path("api-auth/logout/", logout_user),
    path("", RedirectView.as_view(url="http://localhost:3000/", permanent=False)),
]
