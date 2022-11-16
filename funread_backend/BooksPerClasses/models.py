from django.db import models
from Users.models import User
from Books.models import Book

# Create your models here.

class BooksPerClasses(models.Model):
    booksPerClassesId = models.AutoField(primary_key=True)
    booksId = models.ForeignKey(Book, related_name='booksId',db_column='booksId', on_delete=models.CASCADE, to_field='booksid')
    classesId = models.ForeignKey(User, related_name='classesId',db_column='classesId', on_delete=models.CASCADE, to_field='classesId')
