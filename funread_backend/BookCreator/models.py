from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from Users.models import User
# Create your models here.  
class Book(models.Model):
  bookid = models.AutoField(primary_key=True)
  title = models.CharField(max_length=200, blank=True)
  category = models.IntegerField(blank=True,null=True)
  portrait = models.CharField(max_length=200, blank=True)
  createdBy = models.ForeignKey(User,related_name='user_that_create_it', on_delete=models.CASCADE)
  createdAt = models.DateTimeField(blank=True, null=True)
  updatedBy = models.ForeignKey(User,related_name='user_that_update_it', on_delete=models.CASCADE)
  updatedAt = models.DateTimeField(blank=True, null=True)
  state = models.IntegerField(blank=True)
  sharedBook = models.BooleanField(default=False, blank=True, null=True)
  """
class Pages(models.Model):
  pageid = models.AutoField(primary_key=True)
  bookid = models.ForeignKey(Book, on_delete=models.CASCADE)
  type = models.IntegerField(blank=True)
  template = models.IntegerField(blank=True)

"""

 


