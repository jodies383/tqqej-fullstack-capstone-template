from django.db import models
from django.contrib.auth.models import User

class Dealer(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    phone = models.CharField(max_length=50)
    image_url = models.URLField(default="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80")
    def __str__(self): return self.name

class Review(models.Model):
    dealer = models.ForeignKey(Dealer, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=5)
    text = models.TextField()
    sentiment = models.CharField(max_length=30, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"{self.dealer.name} - {self.rating}/5"

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

class CarModel(models.Model):
    make = models.ForeignKey(CarMake, related_name="models", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self): return f"{self.make.name} {self.name}"
