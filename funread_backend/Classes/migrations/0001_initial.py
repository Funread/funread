# Generated by Django 4.0.2 on 2024-11-11 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),
        ('GroupsCreate', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('classesid', models.AutoField(db_column='ClassesId', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=200)),
                ('grade', models.IntegerField(blank=True, db_column='Grade', null=True)),
                ('createdat', models.DateTimeField(blank=True, db_column='CreatedAt', null=True)),
                ('lastupdateat', models.DateTimeField(blank=True, db_column='LastUpdateAt', null=True)),
                ('startdate', models.DateTimeField(blank=True, db_column='StartDate', null=True)),
                ('finishdate', models.DateTimeField(blank=True, db_column='FinishDate', null=True)),
                ('isactive', models.IntegerField(blank=True, null=True)),
                ('groupscreateid', models.ForeignKey(blank=True, db_column='GroupsCreateId', null=True, on_delete=django.db.models.deletion.CASCADE, to='GroupsCreate.groupscreate')),
                ('teacherassigned', models.ForeignKey(blank=True, db_column='TeacherAssigned', null=True, on_delete=django.db.models.deletion.CASCADE, to='Users.user')),
            ],
            options={
                'db_table': 'classes',
            },
        ),
    ]
