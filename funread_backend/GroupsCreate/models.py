from django.db import models
from Users.models import User
from Media.models import Media

# Create your models here.

class GroupsCreate(models.Model):
    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=300)
    idimage = models.ForeignKey(Media, on_delete=models.CASCADE, to_field='id')
    createdby = models.ForeignKey(User, on_delete=models.CASCADE, to_field='userid')
    createdat = models.DateTimeField(blank=True, null=True)
    isactive = models.IntegerField(blank=True, null=True)

    class Meta:
        
        db_table = 'groupscreate'