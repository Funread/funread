# Generated by Django 4.0.2 on 2023-10-17 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),
        ('Roles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Userroles',
            fields=[
                ('userrolesid', models.AutoField(db_column='UserRolesId', primary_key=True, serialize=False)),
                ('idrole', models.ForeignKey(db_column='IdRole', on_delete=django.db.models.deletion.CASCADE, to='Roles.roles')),
                ('iduser', models.ForeignKey(db_column='IdUser', on_delete=django.db.models.deletion.CASCADE, to='Users.user')),
            ],
            options={
                'db_table': 'userroles',
            },
        ),
    ]
