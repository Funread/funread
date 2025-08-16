from django.db import models

class AvatarCreator(models.Model):
    skin_color = models.IntegerField()
    hair_style = models.IntegerField()
    accessories = models.JSONField(default=list)
    shirt = models.IntegerField()
    pants = models.IntegerField()
    head = models.IntegerField()
    hair = models.IntegerField()

    class Meta:
        db_table = 'avatarcreator'