from django.db import models
from Users.models import User

class Mail(models.Model):
    emailId = models.AutoField(primary_key=True)
    emailTo = models.CharField(max_length=200, blank=False, null=False )
    emailFrom = models.CharField(max_length=200,blank=False, null=False)
    emailSubject = models.CharField(max_length=50,blank=True, null=True)
    bodyMessage = models.TextField(max_length=500,blank=False, null=False)
    
class MailControl(models.Model):
    idControl = models.ForeignKey(Mail, related_name='idControl',db_column='idControl', on_delete=models.CASCADE, to_field='emailId')
    emailFrom = models.ForeignKey(User, related_name='emailFrom',db_column='emailFrom', on_delete=models.CASCADE, to_field='email')
    date = models.DateTimeField(db_column='date',blank=False, null=False)
    category = models.IntegerField(db_column='category', blank=False, null=False)
    status = models.CharField(max_length=5,blank=False, null=False) 

#Terminar el modelo Mail y construir el model MailControl