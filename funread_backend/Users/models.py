from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
# Create your models here.

class User(models.Model):
    userid = models.AutoField(primary_key=True)  # Field name made lowercase.
    email = models.CharField(max_length=200, unique=True)  # Field name made lowercase.
    name = models.CharField(max_length=200, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(max_length=200, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=256, blank=True, null=True)  # Field name made lowercase.
    createdat = models.DateTimeField(blank=True, null=True)  # Field name made lowercase.
    actived = models.IntegerField(blank=True, null=True)  # Field name made lowercase.
