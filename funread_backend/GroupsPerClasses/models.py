from django.db import models
from Classes.models import Classes
from StudentsGroups.models import StudentsGroups

# Create your models here.

class GroupsPerClasses(models.Model):
    groupsPerClassesId = models.AutoField(primary_key=True)
    groupId = models.ForeignKey(StudentsGroups, related_name='groupIdmodels',db_column='groupId', on_delete=models.CASCADE, to_field='groupId')
    classesId = models.ForeignKey(Classes, related_name='classesIdmodels',db_column='classesId', on_delete=models.CASCADE, to_field='classesId')
