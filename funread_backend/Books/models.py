from django.db import models
from Users.models import User
class Book(models.Model):
    bookid = models.AutoField(db_column='bookid', primary_key=True)  # Field name made lowercase.
    title = models.CharField(db_column='title', max_length=200)  # Field name made lowercase.
    category = models.IntegerField(db_column='category', blank=True, null=True)  # Field name made lowercase.
    portrait = models.CharField(db_column='portrait', max_length=200, blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey(User, related_name='createdby',db_column='createdby', on_delete=models.CASCADE, to_field='userid')
    createdat = models.DateTimeField(db_column='createdat', blank=True, null=True)  # Field name made lowercase 
    updatedby = models.ForeignKey(User,  related_name='updatedby',db_column='updatedby', on_delete=models.CASCADE, to_field='userid')
    lastupdateat = models.DateTimeField(db_column='lastupdateat', blank=True, null=True)  # Field name made lowercase.
    state = models.IntegerField(db_column='state')  # Field name made lowercase.
    sharedbook = models.IntegerField(db_column='sharedbook', blank=True, null=True)
