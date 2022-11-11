from django.db import models
from Users.models import User
# Create your models here.

class Grades(models.Model):
    gradesid = models.AutoField(primary_key=True)
    booksid = models.CharField(max_length=200, blank=False, null=False )
    progress = models.IntegerField(blank=True, null=True)
    grade = models.FloatField(blank=True, null=True)
    iduser = models.ForeignKey(User,related_name='iduser',db_column='iduser', on_delete=models.CASCADE, to_field='userid')

#pasar a minusculas, usar camelCase (para definir variables)