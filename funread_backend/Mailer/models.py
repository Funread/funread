from curses import def_shell_mode
from django.db import models

class Mail(models.Model):
    emailId = models.AutoField(primary_key=True)
    emailTo = models.CharField(max_length=200, blank=False, null=False )
    emailFrom = models.CharField(max_length=200,blank=False, null=False)
    
# Terminar el modelo Mail y construir el model MailControl