from django.db import models
from Users.models import Class
from Books.models import Groups

# Create your models here.

class GroupsPerClasses(models.Model):
    groupsPerClassesId = models.AutoField(primary_key=True)
    groupsId = models.ForeignKey(Groups, related_name='groupsId',db_column='groupsId', on_delete=models.CASCADE, to_field='groupsId')
    classesId = models.ForeignKey(Class, related_name='classesId',db_column='classesId', on_delete=models.CASCADE, to_field='classesId')
