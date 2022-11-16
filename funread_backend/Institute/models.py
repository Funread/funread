from django.db import models
from Users.models import User

# Create your models here.


class Institute(models.Model):
    instituteId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, blank=False, null=False,unique=True)
   

class InstituteMembers(models.Model):
    instituteMembersId = models.AutoField(primary_key=True)
    instituteId =  models.ForeignKey(Institute, related_name='instituteId1',db_column='instituteId', on_delete=models.CASCADE, to_field='instituteId')
    userId = models.ForeignKey(User, related_name='userId1',db_column='userId', on_delete=models.CASCADE, to_field='userid')


