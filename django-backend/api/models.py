from django.db import models
from django.contrib.auth.models import User


class CarMake(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    make = models.ForeignKey(CarMake, on_delete=models.CASCADE, related_name='models')
    name = models.CharField(max_length=100)
    year = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.year})" if self.year else self.name


class Dealership(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=2, blank=True)
    zip_code = models.CharField(max_length=10, blank=True)
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"{self.name} - {self.city}, {self.state}"


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=200)
    dealership = models.ForeignKey(Dealership, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    purchase = models.BooleanField(default=False)
    purchase_date = models.DateField(null=True, blank=True)
    car_make = models.ForeignKey(CarMake, null=True, blank=True, on_delete=models.SET_NULL)
    car_model = models.ForeignKey(CarModel, null=True, blank=True, on_delete=models.SET_NULL)
    car_year = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['-time']

    def __str__(self):
        return f"Review by {self.name} on {self.dealership}"
