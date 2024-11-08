# avatar_creator/models.py

from django.db import models

class Avatar(models.Model):
    skin_color = models.CharField(max_length=50)
    hair_style = models.CharField(max_length=50)
    accessories = models.JSONField(default=list)