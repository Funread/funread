from django.db import models

# Create your models here.

class Media(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300,unique=True)
    extension = models.CharField(max_length=10)
    file = models.FileField(blank='', default="", upload_to='media/')

    class Meta:
        db_table = 'media'