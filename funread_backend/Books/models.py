from django.db import models
from Users.models import User

class Book(models.Model):
    bookid = models.AutoField(db_column='BookID', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=200)  # Field name made lowercase.
    category = models.IntegerField(db_column='Category', blank=True, null=True)  # Field name made lowercase.
    portrait = models.CharField(db_column='Portrait', max_length=200, blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey(User, db_column='CreatedBy', related_name='created_books', blank=True, null=True, on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    lastupdateby = models.ForeignKey(User, db_column='LastUpdateBy', related_name='last_updated_books', blank=True, null=True, on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    lastupdateat = models.DateTimeField(db_column='LastUpdateAt', blank=True, null=True)  # Field name made lowercase.
    state = models.IntegerField(db_column='State')  # Field name made lowercase.
    sharedbook = models.IntegerField(db_column='SharedBook', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'book'