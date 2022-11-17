from django.db import models
from Classes.models import Classes
from Users.models import User


class ClassesLog(models.Model):
    classeslogid = models.AutoField(primary_key=True)
    classesid =  models.ForeignKey(Classes, related_name='classesid1',db_column='classesid', on_delete=models.CASCADE, to_field='classesId')
    userid = models.ForeignKey(User, related_name='userId2',db_column='userId', on_delete=models.CASCADE, to_field='userid')
    createat = models.DateTimeField(blank=True, null=True)
    description = models.CharField(max_length=100,blank=True, null=True)
