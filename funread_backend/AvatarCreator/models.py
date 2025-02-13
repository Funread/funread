from django.db import models

class AvatarCreator(models.Model):
    skin_color = models.CharField(max_length=50)
    hair_style = models.CharField(max_length=50)
    accessories = models.JSONField(default=list)