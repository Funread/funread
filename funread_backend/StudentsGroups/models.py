from django.db import models
from Users.models import User

class StudentsGroups(models.Model):
    groupsid = models.AutoField(db_column='GroupsId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserId', related_name='student_groups', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    isteacher = models.IntegerField(db_column='isTeacher', blank=True, null=True)  # Field name made lowercase.
    createdby = models.ForeignKey(User, db_column='CreatedBy', related_name='created_student_groups', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'studentgroups'