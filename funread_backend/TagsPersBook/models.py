from django.db import models
from Books.models import Book
from Tags.models import Tags
# Create your models here.

class TagsPerBook(models.Model):
    tagsperbookid = models.AutoField(primary_key=True)
    bookid =  models.ForeignKey(Book, related_name='bookiddb',db_column='bookid', on_delete=models.CASCADE, to_field='bookid')
    tagsid = models.ForeignKey(Tags, related_name='tagsiddb',db_column='tagsid', on_delete=models.CASCADE, to_field='tagsId')
