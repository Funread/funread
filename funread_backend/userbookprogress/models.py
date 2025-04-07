from django.db import models
from Users.models import User
from Books.models import Book

class UserBookProgress(models.Model):
    STATUS_CHOICES = (
        (0, 'TODO'),
        (1, 'Completado'),
        (2, 'En progreso'),
    )

    id = models.AutoField(primary_key=True, db_column='Id')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='UserId')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, db_column='BookId')
    status = models.IntegerField(choices=STATUS_CHOICES, default=0, db_column='Status')
    calificacion = models.FloatField(null=True, blank=True, db_column='Calificacion')

    class Meta:
        db_table = 'userbookprogress'
