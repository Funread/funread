from django.db import models
from django.db import models
from Users.models import User
from folder.models import Folder
from Tags.models import Tags

class File(models.Model):
    fileid = models.AutoField(db_column='FileId', primary_key=True)  # Field name made lowercase.
    filelocation = models.CharField(db_column='FileLocation', max_length=200)  # Field name made lowercase.
    foldersid = models.ForeignKey(Folder, db_column='FoldersId', on_delete=models.CASCADE, to_field='foldersid')  # Field name made lowercase.
    uploadby = models.ForeignKey(User, db_column='UploadBy', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    idtags = models.ForeignKey(Tags, db_column='IdTags', blank=True, null=True, on_delete=models.CASCADE, to_field='tagsid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'file'