# Generated by Django 4.0.2 on 2024-11-11 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AvatarCreator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skin_color', models.CharField(max_length=50)),
                ('hair_style', models.CharField(max_length=50)),
                ('accessories', models.JSONField(default=list)),
            ],
        ),
    ]