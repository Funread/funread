from django.db import models
from Users.models import User
from Books.models import Book

# Create your models here.

class GroupsPerClasses(models.Model):
    GroupsPerClassesId = models.AutoField(primary_key=True)
    GroupsId = models.ForeignKey(Book, related_name='GroupsId',db_column='GroupsId', on_delete=models.CASCADE, to_field='idgroups')
    ClassesId = models.ForeignKey(User, related_name='ClassesId',db_column='ClassesId', on_delete=models.CASCADE, to_field='idclasses')
