from django.db import models

# Create your models here.

class Teachers(models.Model):
    TeacherId = models.AutoField(primary_key=True)
    TeacherName = models.CharField(max_length=500)
    TeacherPwd = models.CharField(max_length=50)