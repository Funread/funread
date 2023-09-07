from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
# Create your models here.

class User(models.Model):
    email = models.CharField(max_length=2000)  # Field name made lowercase.
   