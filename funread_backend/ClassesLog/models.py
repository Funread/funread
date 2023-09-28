from django.db import models
from Classes.models import Classes
from Users.models import User

class ClassesLog(models.Model):
    classeslogid = models.AutoField(db_column='ClassesLogId', primary_key=True)  # Field name made lowercase.
    classesid = models.ForeignKey(Classes, db_column='ClassesID', on_delete=models.CASCADE, to_field='classesid')  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserID', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=100, db_collation='utf8mb3_general_ci', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'classeslog'