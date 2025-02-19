from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Team', '0001_initial'),
        ('Users', '0001_initial'), 
    ]

    operations = [
        migrations.CreateModel(
            name='TeamUser',
            fields=[
                ('id', models.AutoField(db_column='Id', primary_key=True, serialize=False)),
                ('team', models.ForeignKey(db_column='TeamId', on_delete=django.db.models.deletion.CASCADE, to='Team.team')),
                ('user', models.ForeignKey(db_column='UserId', on_delete=django.db.models.deletion.CASCADE, to='Users.user')), 
            ],
            options={
                'db_table': 'teamuser',
            },
        ),
    ]
