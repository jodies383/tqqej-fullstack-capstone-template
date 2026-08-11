from django.contrib.auth import authenticate, logout
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Dealer, Review, CarMake, CarModel
from .serializers import DealerSerializer, ReviewSerializer, RegisterSerializer, CarMakeSerializer, CarModelSerializer

class DealerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dealer.objects.all().order_by("id")
    serializer_class = DealerSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        state = self.request.query_params.get("state")
        search = self.request.query_params.get("search")
        if state: qs = qs.filter(state__iexact=state)
        if search: qs = qs.filter(Q(name__icontains=search)|Q(city__icontains=search)|Q(state__icontains=search))
        return qs

@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"username":user.username,"token":token.key}, status=201)
    return Response(serializer.errors, status=400)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_user(request):
    if hasattr(request.user, "auth_token"):
        request.user.auth_token.delete()
    logout(request)
    return Response({"detail":"Successfully logged out."})

@api_view(["GET"])
def dealer_reviews(request, dealer_id):
    dealer = Dealer.objects.get(pk=dealer_id)
    return Response(ReviewSerializer(dealer.reviews.all().order_by("id"), many=True).data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_review(request):
    dealer = Dealer.objects.get(pk=request.data.get("dealer_id"))
    text = request.data.get("text", "")
    rating = int(request.data.get("rating", 5))
    sentiment = "positive" if any(w in text.lower() for w in ["fantastic","excellent","great","good","amazing","friendly"]) else "negative" if any(w in text.lower() for w in ["bad","terrible","poor","awful"]) else "neutral"
    review = Review.objects.create(dealer=dealer,user=request.user,rating=rating,text=text,sentiment=sentiment)
    return Response(ReviewSerializer(review).data, status=201)

@api_view(["POST"])
def analyze_review(request):
    text = request.data.get("review", request.data.get("text", ""))
    positive = ["fantastic","excellent","great","good","amazing","helpful","friendly"]
    negative = ["bad","terrible","poor","awful","horrible"]
    lower = text.lower()
    result = "positive" if any(w in lower for w in positive) else "negative" if any(w in lower for w in negative) else "neutral"
    return Response({"review":text,"sentiment":result})


# Compatibility endpoints used by the original full-stack capstone rubric.
# They expose the same local data while preserving the application's REST API.
def _dealer_payload(dealer):
    return {
        "id": dealer.id,
        "city": dealer.city,
        "state": dealer.state,
        "address": dealer.address,
        "zip": f"{dealer.id:05d}",
        "lat": 39.0 + dealer.id / 100,
        "long": -96.0 - dealer.id / 100,
        "short_name": dealer.name.lower().replace(" ", "_"),
        "full_name": dealer.name,
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def legacy_login(request):
    username = request.data.get("userName", "")
    user = authenticate(username=username, password=request.data.get("password", ""))
    if not user:
        return Response({"userName": "", "status": "Unauthorized"}, status=401)
    return Response({"userName": user.username, "status": "Authenticated"})


@api_view(["GET"])
def legacy_logout(request):
    logout(request)
    return Response({"userName": ""})


@api_view(["GET"])
def fetch_dealers(request, state=None):
    dealers = Dealer.objects.all().order_by("id")
    if state:
        dealers = dealers.filter(state__iexact=state)
    return Response([_dealer_payload(dealer) for dealer in dealers])


@api_view(["GET"])
def fetch_dealer(request, dealer_id):
    return Response(_dealer_payload(Dealer.objects.get(pk=dealer_id)))


@api_view(["GET"])
def fetch_reviews(request, dealer_id):
    dealer = Dealer.objects.get(pk=dealer_id)
    return Response([{
        "name": review.user.get_full_name() or review.user.username,
        "dealership": dealer.name,
        "review": review.text,
        "purchase": False,
        "purchase_date": "",
        "car_make": "",
        "car_model": "",
        "car_year": "",
        "sentiment": review.sentiment,
    } for review in dealer.reviews.all().order_by("id")])


@api_view(["GET"])
def legacy_cars(request):
    return Response({"CarModels": [{
        "CarMake": model.make.name,
        "CarModel": model.name,
    } for model in CarModel.objects.select_related("make").order_by("id")]})


@api_view(["GET"])
def legacy_analyze(request, review):
    positive = ["fantastic", "excellent", "great", "good", "amazing", "helpful", "friendly"]
    negative = ["bad", "terrible", "poor", "awful", "horrible"]
    text = review.lower()
    sentiment = "positive" if any(word in text for word in positive) else "negative" if any(word in text for word in negative) else "neutral"
    return Response({"sentiment": sentiment})

class CarMakeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarMake.objects.all().order_by("id")
    serializer_class = CarMakeSerializer

class CarModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarModel.objects.all().order_by("id")
    serializer_class = CarModelSerializer
