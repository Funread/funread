from django.db import models
from Roles.models import Roles
from Users.models import User

class Userroles(models.Model):
    userrolesid = models.AutoField(db_column='UserRolesId', primary_key=True)  # Field name made lowercase.
    iduser = models.ForeignKey(User, db_column='IdUser', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.
    idrole = models.ForeignKey(Roles, db_column='IdRole', on_delete=models.CASCADE, to_field='rolesid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'userroles'

# terminar URLs y views, no existen actualmente