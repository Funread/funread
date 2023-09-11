from django.db import models
#from Users.models import User

class Roles(models.Model):
    rolesid = models.AutoField(primary_key=True)
    role = models.CharField(max_length=200, blank=False, unique=True )
    
#class UserRoles(models.Model):
    #userrolesid = models.AutoField(primary_key=True)
    #idrole = models.ForeignKey(Roles, related_name='idrole',db_column='idrole', on_delete=models.CASCADE, to_field='rolesid')
    #iduser = models.ForeignKey(User, related_name='iduser',db_column='iduser', on_delete=models.CASCADE, to_field='userid')

#Terminar el modelo Mail y construir el model MailControl