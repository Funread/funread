from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Books', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookCategory',
            fields=[
                ('bookcategoryid', models.AutoField(db_column='BookCategoryID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='CategoryName', max_length=100)),
            ],
            options={
                'db_table': 'bookcategory',
            },
        ),
        migrations.CreateModel(
            name='BookDilemma',
            fields=[
                ('bookdilemmaid', models.AutoField(db_column='BookDilemmaID', primary_key=True, serialize=False)),
                ('dilemma', models.CharField(db_column='Dilemma', max_length=500)),
            ],
            options={
                'db_table': 'bookdilemma',
            },
        ),
        migrations.CreateModel(
            name='DilemmaPerBook',
            fields=[
                ('dilemmaperbookid', models.AutoField(db_column='DilemmaPerBookID', primary_key=True, serialize=False)),
                ('bookdilemmaid', models.ForeignKey(db_column='BookDilemmaID', on_delete=django.db.models.deletion.CASCADE, related_name='DilemmaPerBook_book_dilemma_dilemma', to='BooksDilemma.bookdilemma')),
                ('bookid', models.ForeignKey(db_column='BookID', on_delete=django.db.models.deletion.CASCADE, related_name='DilemmaPerBook_book_id_book', to='Books.book')),
            ],
            options={
                'db_table': 'dilemmaperbook',
            },
        ),
        migrations.CreateModel(
            name='BookDimension',
            fields=[
                ('bookdimensionid', models.AutoField(db_column='BookDimensionID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='DimensionName', max_length=150)),
                ('bookcategoryid', models.ForeignKey(db_column='BookCategoryID', on_delete=django.db.models.deletion.CASCADE, related_name='DilemmaPerBook_book_category_dimension', to='BooksDilemma.bookcategory')),
            ],
            options={
                'db_table': 'bookdimension',
            },
        ),
        migrations.AddField(
            model_name='bookdilemma',
            name='bookdimensionid',
            field=models.ForeignKey(db_column='BookDimensionID', on_delete=django.db.models.deletion.CASCADE, related_name='DilemmaPerBook_book_dimension_dilemma', to='BooksDilemma.bookdimension'),
        ),
        migrations.RunSQL(
            """
            -- Insertar en bookcategory
            INSERT INTO bookcategory (CategoryName) VALUES
                ('Justicia Social')
            ON DUPLICATE KEY UPDATE CategoryName=VALUES(CategoryName);

            -- Insertar en bookdimension
            INSERT INTO bookdimension (DimensionName, BookCategoryID) VALUES
                ('Redistribucion de recursos, bienes y capacidades', 1),
                ('Reconocimiento de la diversidad y la valoración y celebración', 1),
                ('Representación de todas las personas de forma democrática, especialmente en aquellos ámbitos que más les afectan y están más implicados', 1)
            ON DUPLICATE KEY UPDATE DimensionName=VALUES(DimensionName), BookCategoryID=VALUES(BookCategoryID);

            -- Insertar en bookdilemma
            INSERT INTO bookdilemma (Dilemma, BookDimensionID) VALUES
                ('Paises pobres', 1),
                ('Discapacidad laboral', 1),
                ('Trabajo infantil', 1),
                ('Excursion', 1),
                ('Becas escolares', 1),
                ('Idioma', 2),
                ('Acceso TICS', 2),
                ('Mujeres', 2),
                ('Acoso escolar', 2),
                ('Familia', 2),
                ('Hijos de parejas homosexuales', 2),
                ('Elección delegado', 3),
                ('Voto elecciones generales', 3),
                ('Alumnos escasa participación', 3),
                ('Gobierno democrático', 3),
                ('Lenguas cooficiales', 3),
                ('Justicia Universal', 3)
            ON DUPLICATE KEY UPDATE Dilemma=VALUES(Dilemma), BookDimensionID=VALUES(BookDimensionID);
            """,
            reverse_sql="""
            DELETE FROM bookdilemma WHERE BookDimensionID IN (1, 2, 3);
            DELETE FROM bookdimension WHERE BookCategoryID = 1;
            DELETE FROM bookcategory WHERE CategoryName = 'Justicia Social';
            """
        ),
    ]
