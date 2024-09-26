from django.db import models
from Users.models import User

class Mail(models.Model):
    emailid = models.AutoField(db_column='emailId', primary_key=True)  # Field name made lowercase.
    emailTo = models.CharField(db_column='emailTo', max_length=254, blank=False, null=False)  # Field name made lowercase.
    emailFrom = models.CharField(db_column='emailFrom', max_length=254, blank=False, null=False)  # Field name made lowercase.
    emailSubject = models.CharField(db_column='emailSubject', max_length=100, blank=False, null=False)  # Field name made lowercase.
    bodyMessage = models.TextField(db_column='bodyMessage', max_length=500, blank=False, null=False)  # Field name made lowercase.

    class Meta:
        
        db_table = 'mail'

class MailControl(models.Model):
    mailcontrolid = models.AutoField(db_column='mailControlId', primary_key=True)  # Field name made lowercase.
    date = models.DateTimeField(db_column='date',blank=False, null=False)
    category = models.IntegerField(db_column='category', blank=False, null=False)
    status = models.CharField(max_length=5)
    idcontrol = models.ForeignKey(Mail, db_column='idControl', blank=True, null=True, on_delete=models.CASCADE, to_field='emailid')  # Field name made lowercase.
    emailFrom = models.ForeignKey(User, db_column='emailFrom', on_delete=models.CASCADE, to_field='email')  # Field name made lowercase.

    class Meta:
        
        db_table = 'mailcontrol'

#Terminar el modelo Mail y construir el model MailControl