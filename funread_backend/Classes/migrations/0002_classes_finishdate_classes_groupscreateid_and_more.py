# Generated by Django 4.0.2 on 2023-10-13 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('GroupsCreate', '0001_initial'),
        ('Classes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='classes',
            name='finishdate',
            field=models.DateTimeField(blank=True, db_column='FinishDate', null=True),
        ),
        migrations.AddField(
            model_name='classes',
            name='groupscreateid',
            field=models.ForeignKey(blank=True, db_column='GroupsCreateId', null=True, on_delete=django.db.models.deletion.CASCADE, to='GroupsCreate.groupscreate'),
        ),
        migrations.AddField(
            model_name='classes',
            name='startdate',
            field=models.DateTimeField(blank=True, db_column='StartDate', null=True),
        ),
    ]