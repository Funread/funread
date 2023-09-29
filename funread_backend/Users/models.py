from django.db import models

class User(models.Model):
    userid = models.AutoField(db_column='UserId', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=200)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', max_length=200, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=256, db_collation='utf8mb3_general_ci', blank=True, null=True)
    createdat = models.DateTimeField(db_column='CreatedAt', blank=True, null=True)  # Field name made lowercase.
    actived = models.IntegerField(db_column='Actived', blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', unique=True, max_length=200)
    #roles = models.ManyToManyField(Roles) #crea propiedad de roles many to many en users para poder generar la tabla usando el orm, test
    

    class Meta:
        
        db_table = 'user'