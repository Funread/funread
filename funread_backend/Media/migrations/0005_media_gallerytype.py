# Generated by Django 4.0.2 on 2023-12-05 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Media', '0004_media_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='media',
            name='galleryType',
            field=models.IntegerField(blank=True, db_column='galleryType', null=True),
        ),
    ]
