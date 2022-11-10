# Generated by Django 4.0.2 on 2022-11-07 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('rolesid', models.AutoField(primary_key=True, serialize=False)),
                ('role', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='UserRoles',
            fields=[
                ('userrolesid', models.AutoField(primary_key=True, serialize=False)),
                ('idrole', models.ForeignKey(db_column='idrole', on_delete=django.db.models.deletion.CASCADE, related_name='idrole', to='Roles.roles')),
                ('iduser', models.ForeignKey(db_column='iduser', on_delete=django.db.models.deletion.CASCADE, related_name='iduser', to='Users.user')),
            ],
        ),
    ]