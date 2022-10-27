from django.db import models
from django.db import models
from Users.models import User
from folder.models import Folder
from Tags.models import Tags

class File(models.Model):
    fileid = models.AutoField(db_column='fileid', primary_key=True)  # Field name made lowercase.
    namefile = models.CharField(db_column='namefile', max_length=200, unique=True)  # Field name made lowercase.
    filelocation = models.FileField(upload_to='archivos/')
    idfolder = models.ForeignKey(Folder, related_name='idfolder',db_column='idfolder', on_delete=models.CASCADE, to_field='foldersId')
    uploadby  = models.ForeignKey(User, related_name='uploadby',db_column='uploadby', on_delete=models.CASCADE, to_field='userid')    
    idtags = models.ForeignKey(Tags, related_name='idtags',db_column='idtags', on_delete=models.CASCADE, to_field='tagsId')
