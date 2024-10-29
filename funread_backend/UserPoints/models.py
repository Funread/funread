from django.db import models
from Users.models import User  # Importamos el modelo de User

class UserPoints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_points = models.IntegerField()

    def __str__(self):
        return f'{self.user} - {self.total_points} points'
