from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Dealership, Review, CarMake, CarModel
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Seed sample dealerships, makes, models, and reviews for local development'

    def handle(self, *args, **options):
        admin_user, admin_created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@example.com', 'is_staff': True, 'is_superuser': True})
        if admin_created or not admin_user.check_password('admin1234'):
            admin_user.set_password('admin1234')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()

        user, _ = User.objects.get_or_create(username='demo', defaults={'email': 'demo@example.com'})
        if not user.check_password('demo1234'):
            user.set_password('demo1234')
            user.save()

        makes = ['Audi', 'BMW', 'Toyota']
        for make_name in makes:
            CarMake.objects.get_or_create(name=make_name)

        make_map = {make.name: make for make in CarMake.objects.all()}
        for make_name, model_names in {'Audi': ['A4', 'A6'], 'BMW': ['3 Series', '5 Series'], 'Toyota': ['Camry', 'Corolla']}.items():
            for model_name in model_names:
                CarModel.objects.get_or_create(make=make_map[make_name], name=model_name)

        dealerships = [
            {'name': 'North Hills Auto', 'address': '100 Main St', 'city': 'Raleigh', 'state': 'NC', 'zip_code': '27601', 'phone': '919-555-1001'},
            {'name': 'Sunset Motors', 'address': '220 Ocean Ave', 'city': 'Miami', 'state': 'FL', 'zip_code': '33139', 'phone': '305-555-2200'},
            {'name': 'Bay Area Autos', 'address': '10 Market St', 'city': 'San Francisco', 'state': 'CA', 'zip_code': '94105', 'phone': '415-555-3003'},
            {'name': 'Lakeside Car Center', 'address': '77 Lake Rd', 'city': 'Austin', 'state': 'TX', 'zip_code': '78701', 'phone': '512-555-4044'},
        ]

        for data in dealerships:
            dealership, created = Dealership.objects.get_or_create(name=data['name'], defaults=data)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created dealership: {dealership.name}'))

        if not Review.objects.exists():
            dealers = list(Dealership.objects.all())
            reviews = [
                ('Mina', 'Great service and fast financing.', dealers[0], True, datetime.now() - timedelta(days=1)),
                ('Jules', 'Friendly staff and clean showroom.', dealers[1], False, datetime.now() - timedelta(days=2)),
                ('Nadia', 'Very transparent on pricing.', dealers[2], True, datetime.now() - timedelta(days=3)),
                ('Chris', 'Easy pickup and good trade-in offer.', dealers[3], True, datetime.now() - timedelta(days=4)),
            ]
            for name, text, dealership, purchase, timestamp in reviews:
                Review.objects.create(
                    user=user,
                    name=name,
                    dealership=dealership,
                    review=text,
                    purchase=purchase,
                    purchase_date=timestamp.date(),
                    car_make=CarMake.objects.order_by('?').first(),
                    car_model=CarModel.objects.order_by('?').first(),
                    car_year=2020,
                )

        self.stdout.write(self.style.SUCCESS('Sample data seeded successfully.'))
