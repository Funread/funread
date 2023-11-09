from django.db import models
from Media.models import Media

# Create your models here.

class Subtitled(models.Model):
    idsubtitled = models.AutoField(primary_key=True)
    idmedia = models.ForeignKey(Media,db_column='idmedia',on_delete=models.CASCADE, to_field='id')
    transcription = models.JSONField()
    translation = models.JSONField()

    class Meta:
        db_table = 'subtitled'