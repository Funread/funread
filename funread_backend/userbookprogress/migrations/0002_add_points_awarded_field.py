# Generated migration for adding points_awarded field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userbookprogress', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbookprogress',
            name='points_awarded',
            field=models.BooleanField(default=False, db_column='PointsAwarded'),
        ),
    ]
