from django.db import models

# Create your models here.

class Media(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    extension = models.CharField(max_length=10)
    image = models.ImageField(blank='', default="", upload_to='media/')

    class Meta:
        db_table = 'media'