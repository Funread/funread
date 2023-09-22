from django.db import models
from Users.models import User

class Classes(models.Model):
    classesid = models.AutoField(db_column='ClassesId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.
    grade = models.IntegerField(db_column='Grade', blank=True, null=True)  # Field name made lowercase.
    teacherassigned = models.ForeignKey(User, db_column='TeacherAssigned',on_delete=models.CASCADE, to_field='userid', blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    lastupdateat = models.DateTimeField(db_column='LastUpdateAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'classes'