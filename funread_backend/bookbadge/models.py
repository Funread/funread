from django.db import models
from Books.models import Book
from Badges.models import Badge

class BookBadge(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, db_column='BookId')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, db_column='BadgeId')

    class Meta:
        db_table = 'bookbadge'
