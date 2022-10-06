from django.db import models
from Users.models import User
class Book(models.Model):
    bookid = models.AutoField(db_column='BookID', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=200)  # Field name made lowercase.
    category = models.IntegerField(db_column='Category', blank=True, null=True)  # Field name made lowercase.
    portrait = models.CharField(db_column='Portrait', max_length=200, blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey(User, related_name='createby', on_delete=models.CASCADE, to_field='userid' )
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase 
    updatedby = models.ForeignKey(User,  related_name='updatedby', on_delete=models.CASCADE, to_field='userid' )
    lastupdateat = models.DateTimeField(db_column='LastUpdateAt', blank=True, null=True)  # Field name made lowercase.
    state = models.IntegerField(db_column='State')  # Field name made lowercase.
    sharedbook = models.IntegerField(db_column='SharedBook', blank=True, null=True)
