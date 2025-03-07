from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Pages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Widget',
            fields=[
                ('widgetid', models.AutoField(db_column='WidgetId', primary_key=True, serialize=False)),
                ('type', models.IntegerField(blank=True, db_column='Type', null=True)),
                ('name', models.CharField(blank=True, db_column='Name', max_length=200, null=True)),
            ],
            options={
                'db_table': 'widget',
            },
        ),
        migrations.CreateModel(
            name='WidgetItem',
            fields=[
                ('widgetitemid', models.AutoField(db_column='WidgetItemId', primary_key=True, serialize=False)),
                ('value', models.JSONField(blank=True, db_column='Value', null=True)),
                ('type', models.IntegerField(blank=True, db_column='Type', null=True)),
                ('elementorder', models.IntegerField(blank=True, db_column='ElementOrder', null=True)),
                ('pageid', models.ForeignKey(blank=True, db_column='PageId', null=True, on_delete=django.db.models.deletion.CASCADE, to='Pages.pages')),
                ('widgetid', models.ForeignKey(blank=True, db_column='WidgetId', null=True, on_delete=django.db.models.deletion.CASCADE, to='Widget.widget')),
            ],
            options={
                'db_table': 'widgetitem',
            },
        ),
        migrations.RunSQL(
            """
            INSERT INTO widget (type, name) VALUES
                (1, 'Title'),
                (1, 'Description'),
                (2, 'Image'),
                (2, 'Video'),
                (2, 'Audio'),
                (3, 'Shape'),
                (4, 'True Or False'),
                (5, 'Complete'),
                (4, 'Quiz'),
                (6, 'Code')
            ON DUPLICATE KEY UPDATE name=VALUES(name);
            """,
            reverse_sql="DELETE FROM widget WHERE name IN ('Title', 'Description', 'Image', 'Video', 'Audio', 'Shape', 'True Or False', 'Complete', 'Quiz', 'Code');"
        ),
    ]
