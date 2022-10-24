from django.db import models
from Users.models import User
from folder.models import Folder
from Tags.models import Tags

# Create your models here.
class File(models.Model):
    FileId = models.AutoField(primary_key=True)
    namefile = models.CharField(db_column='namefile',max_length=200, null = True)
    fileLocation = models.FileField(upload_to= 'archivos/', max_length=254, null = False)
    idFolders = models.ForeignKey(Folder,related_name='idFolders',db_column='idFolders',on_delete=models.CASCADE, to_field='foldersId')
    uploadBy = models.ForeignKey(User, related_name='uploadBy', db_column='uploadBy', on_delete=models.CASCADE, to_field='userid')
    idTags = models.ForeignKey(Tags, related_name='idTags', db_column='idTags', on_delete=models.CASCADE, to_field='tagsId')


