from enum import unique
from django.db import models
from Users.models import User

class Folder(models.Model):
    foldersid = models.AutoField(db_column='FoldersId', primary_key=True)  # Field name made lowercase.
    namefolders = models.CharField(db_column='NameFolders', max_length=200)  # Field name made lowercase.
    createdBy = models.ForeignKey(User, db_column='createdBy', on_delete=models.CASCADE, to_field='userid') # Field name made lowercase.


    class Meta:
        
        db_table = 'folders'