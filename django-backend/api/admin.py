from django.contrib import admin
from .models import Dealership, Review, CarMake, CarModel


@admin.register(Dealership)
class DealershipAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'phone')
    search_fields = ('name', 'city', 'state', 'address')
    list_filter = ('state',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'dealership', 'time', 'purchase')
    list_filter = ('purchase', 'dealership__state')
    search_fields = ('name', 'review', 'dealership__name')


@admin.register(CarMake)
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(CarModel)
class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'make', 'year')
    list_filter = ('make', 'year')
    search_fields = ('name', 'make__name')
