from django.db import models
from Books.models import Book
class Pages(models.Model):
    pageid = models.AutoField(db_column='pageid', primary_key=True)  # Field name made lowercase.
    book = models.ForeignKey(Book, related_name='book',db_column='book', on_delete=models.CASCADE, to_field='bookid')
    elementorder = models.IntegerField(db_column='elementorder')  # Field name made lowercase.
    type = models.IntegerField(db_column='type')
    template = models.IntegerField(db_column='template')
