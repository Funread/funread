
from django.db import models

class Team(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=255)
    points = models.IntegerField(db_column='Points')
    created_at = models.DateTimeField(db_column='CreatedAt', auto_now_add=True)
    last_updated = models.DateTimeField(db_column='LastUpdated', auto_now=True)

    class Meta:
        db_table = 'team'


