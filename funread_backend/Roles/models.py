from django.db import models
#from Users.models import User

class Roles(models.Model):
    rolesid = models.AutoField(db_column='RolesId', primary_key=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=200, blank=False, unique=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'roles'
