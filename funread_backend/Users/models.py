from django.db import models

# Create your models here.
class User(models.Model):
    userid = models.IntegerField(db_column='UserId', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=200)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', max_length=200, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=256, db_collation='utf8mb3_general_ci', blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    actived = models.IntegerField(db_column='Actived', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'User'