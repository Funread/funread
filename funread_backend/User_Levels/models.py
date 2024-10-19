
from django.db import models

class UserLevels(models.Model):  
    id = models.AutoField(db_column='Id', primary_key=True)
    username = models.CharField(db_column='UserName', max_length=200)
    level = models.IntegerField(db_column='Level')

    class Meta:
        db_table = 'User_Levels'  

