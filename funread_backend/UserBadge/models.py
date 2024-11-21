from django.db import models
from Users.models import User  # Importamos el modelo de User
from Badges.models import Badge  # Importamos el modelo de Badge

class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    achieved = models.BooleanField(default=False)
    date = models.DateTimeField()
    progress = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user} - {self.badge}'
