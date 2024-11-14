from django.db import models

class Badge(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    points = models.IntegerField()
    icon = models.CharField(max_length=255, blank=True, null=True)
    is_teacher_badge = models.BooleanField(default=False)

    def __str__(self):
        return self.title
