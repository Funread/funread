from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('BooksDilemma', '0003_inject_bookcategory_dimension_dilemma'),
    ]

    operations = [
        migrations.RunSQL(
            """
            -- Corregir el nombre de la dimensión Redistributive a Redistribution
            UPDATE `bookdimension` 
            SET `DimensionName` = 'Redistribution in Education'
            WHERE `DimensionName` = 'Redistributive Dimension in Education';
            """,
            reverse_sql="""
            -- Revertir el cambio si es necesario
            UPDATE `bookdimension` 
            SET `DimensionName` = 'Redistributive Dimension in Education'
            WHERE `DimensionName` = 'Redistribution in Education';
            """
        ),
    ]
