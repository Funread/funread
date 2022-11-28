from django.db import models
from Classes.models import Classes
from Books.models import Book

# Create your models here.

class BooksPerClasses(models.Model):
    booksPerClassesId = models.AutoField(primary_key=True)
    bookId = models.ForeignKey(Book, related_name='bookIdBooksPerClasses',db_column='bookId', on_delete=models.CASCADE, to_field='bookid')
    classesId = models.ForeignKey(Classes, related_name='classesIdBooksPerClasses',db_column='classesId', on_delete=models.CASCADE, to_field='classesId')
