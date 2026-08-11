from django.db import migrations, models
import django.db.models.deletion
class Migration(migrations.Migration):
    initial=True
    dependencies=[("auth","0012_alter_user_first_name_max_length")]
    operations=[
        migrations.CreateModel(name="Dealer",fields=[
            ("id",models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name="ID")),
            ("name",models.CharField(max_length=200)),("city",models.CharField(max_length=100)),
            ("state",models.CharField(max_length=100)),("address",models.CharField(max_length=250)),
            ("phone",models.CharField(max_length=50)),
            ("image_url",models.URLField(default="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80"))]),
        migrations.CreateModel(name="CarMake",fields=[
            ("id",models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name="ID")),
            ("name",models.CharField(max_length=100))]),
        migrations.CreateModel(name="CarModel",fields=[
            ("id",models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name="ID")),
            ("name",models.CharField(max_length=100)),
            ("make",models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,related_name="models",to="dealerships.carmake"))]),
        migrations.CreateModel(name="Review",fields=[
            ("id",models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name="ID")),
            ("rating",models.PositiveIntegerField(default=5)),("text",models.TextField()),
            ("sentiment",models.CharField(blank=True,max_length=30)),("created_at",models.DateTimeField(auto_now_add=True)),
            ("dealer",models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,related_name="reviews",to="dealerships.dealer")),
            ("user",models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,to="auth.user"))])]
