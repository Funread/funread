
from django.db import models
from User_Levels.models import UserLevels  

class UserPointsLog(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    user = models.ForeignKey(UserLevels, on_delete=models.CASCADE, db_column='UserId')  
    points = models.IntegerField(db_column='Points')
    reason = models.CharField(db_column='Reason', max_length=255)
    date = models.DateField(db_column='Date')

    class Meta:
        db_table = 'userpointslog'


