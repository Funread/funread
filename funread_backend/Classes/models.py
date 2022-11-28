from django.db import models

from Users.models import User

# Create your models here.
class Classes(models.Model):
    classesId = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=200, blank=True, null=True, unique=True)
    grade = models.IntegerField(blank=True, null=True)
    teacherAssigned = models.ForeignKey(User, related_name='teacherassigned1',db_column='teacherAssigned', on_delete=models.CASCADE, to_field='userid')
    createdAt = models.DateTimeField(blank=True, null=True)  
    lastupdateAt = models.DateTimeField(blank=True, null=True)  
