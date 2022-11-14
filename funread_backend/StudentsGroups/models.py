from django.db import models
from Users.models import User

# Create your models here.

class StudentsGroups(models.Model):
    groupId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, related_name='idUser',db_column='idUser', on_delete=models.CASCADE, to_field='userid')
    isTeacher = models.IntegerField(db_column='isTeacher', blank=True, null=True)
    createdBy = models.ForeignKey(User, related_name='createdByModel',db_column='createdBy', on_delete=models.CASCADE, to_field='userid')
    createdAt = models.DateTimeField(db_column='createdAt', blank=True, null=True)  
