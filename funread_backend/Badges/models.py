from django.db import models

class Badge(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    points = models.IntegerField()
    icon = models.CharField(max_length=255, blank=True, null=True)
    is_teacher_badge = models.BooleanField(default=False)
    show_progress = models.BooleanField(default=False)
    goal_points = models.IntegerField(
        help_text="Meta numérica para obtener el badge (1-100000)",
        default=1
    )

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'badges'
