from django.db import models

# Create your models here.

class Tags(models.Model):
    tagsId = models.AutoField(primary_key=True)
    description = models.CharField(max_length=200, null=True)

