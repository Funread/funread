from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),  
    ]

    operations = [
        migrations.CreateModel(
            name='UserPointsLog',
            fields=[
                ('id', models.AutoField(db_column='Id', primary_key=True, serialize=False)),
                ('points', models.IntegerField(db_column='Points')),
                ('reason', models.CharField(db_column='Reason', max_length=255)),
                ('date', models.DateField(db_column='Date')),
                ('user', models.ForeignKey(db_column='UserId', on_delete=django.db.models.deletion.CASCADE, to='Users.user')),  
            ],
            options={
                'db_table': 'userpointslog',
            },
        ),
    ]
