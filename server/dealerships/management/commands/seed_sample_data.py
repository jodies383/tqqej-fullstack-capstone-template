from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from dealerships.models import Dealer, Review, CarMake, CarModel
class Command(BaseCommand):
    def handle(self,*args,**kwargs):
        admin,_=User.objects.get_or_create(username="admin"); admin.is_staff=True; admin.is_superuser=True; admin.set_password("admin1234"); admin.save()
        demo,_=User.objects.get_or_create(username="demo"); demo.set_password("demo1234"); demo.email="demo@example.com"; demo.save()
        Review.objects.all().delete(); Dealer.objects.all().delete()
        rows=[
          ("Sunrise Motors","Topeka","Kansas","100 Main Street, Topeka, KS","785-555-0101"),
          ("Prairie Auto Center","Wichita","Kansas","200 Market Street, Wichita, KS","316-555-0102"),
          ("Mountain View Motors","Denver","Colorado","300 Colfax Avenue, Denver, CO","303-555-0103"),
          ("Lakeside Auto Group","Chicago","Illinois","400 Lake Street, Chicago, IL","312-555-0104")]
        dealers=[Dealer.objects.create(name=a,city=b,state=c,address=d,phone=e) for a,b,c,d,e in rows]
        Review.objects.create(dealer=dealers[0],user=demo,rating=5,text="Fantastic services",sentiment="positive")
        Review.objects.create(dealer=dealers[2],user=demo,rating=5,text="Excellent dealership and friendly staff",sentiment="positive")
        CarMake.objects.all().delete()
        for name, models in {"Toyota":["Camry","Corolla","RAV4"],"Honda":["Civic","Accord","CR-V"],"Ford":["Mustang","F-150","Explorer"]}.items():
            make=CarMake.objects.create(name=name)
            for model in models: CarModel.objects.create(make=make,name=model)
        self.stdout.write(self.style.SUCCESS("Sample dealership data created successfully."))
