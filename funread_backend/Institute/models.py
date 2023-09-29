from django.db import models
from Users.models import User

class Institute(models.Model):
    instituteid = models.AutoField(db_column='InstituteId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=False, null=False,unique=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'institute'
   
class InstituteMembers(models.Model):
    institutemembersid = models.AutoField(db_column='InstituteMembersID', primary_key=True)  # Field name made lowercase.
    instituteid = models.ForeignKey(Institute, db_column='InstituteID', on_delete=models.CASCADE, to_field='instituteid')  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserId', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'institutemembers'
