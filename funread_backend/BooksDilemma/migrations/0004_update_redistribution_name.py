from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('BooksDilemma', '0003_inject_bookcategory_dimension_dilemma'),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
            UPDATE bookdimension
            SET DimensionName = 'Redistribution Dimension in education'
            WHERE DimensionName = 'Redistributive Dimension in Education';
            """,
            reverse_sql="""
            UPDATE bookdimension
            SET DimensionName = 'Redistributive Dimension in Education'
            WHERE DimensionName = 'Redistribution Dimension in education';
            """,
        ),
    ]
