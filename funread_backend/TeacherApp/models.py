from django.db import models

# Create your models here.

class Teachers(models.Model):
    TeacherId = models.AutoField(primary_key=True)
    TeacherName = models.CharField(max_length=500)
    TeacherPwd = models.CharField(max_length=50)

    class Meta:
        
        db_table = 'teacher'

# Tener en concideracion que esta tabla no existe en los scrips de base de datos