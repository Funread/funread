from enum import unique
from django.db import models
from Users.models import User

# Create your models here.
class Folder(models.Model):
    foldersId = models.AutoField(primary_key=True)
    nameFolders = models.CharField(max_length=200, unique=True)
    createdBy = models.ForeignKey(User, related_name='createdBy', db_column='createdBy', on_delete=models.CASCADE, to_field='userid')
