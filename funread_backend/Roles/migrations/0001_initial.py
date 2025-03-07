from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('rolesid', models.AutoField(db_column='RolesId', primary_key=True, serialize=False)),
                ('role', models.CharField(db_column='Role', max_length=200, unique=True)),
            ],
            options={
                'db_table': 'roles',
            },
        ),
        # Insertar roles por defecto en la base de datos
        migrations.RunSQL(
            """
            INSERT INTO roles (Role) 
            VALUES 
                ('administrativo'),
                ('estudiante'),
                ('profesor')
            ON DUPLICATE KEY UPDATE Role=VALUES(Role);
            """,
            reverse_sql="DELETE FROM roles WHERE Role IN ('administrativo', 'estudiante', 'profesor');"
        ),
    ]
