# Generated by Django 4.0.2 on 2025-02-19 04:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_alter_user_level'),
        ('UserPoints', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPoints',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_points', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.user')),
            ],
        ),
        migrations.DeleteModel(
            name='UserPointsLog',
        ),
    ]
