from django.db import models
from Users.models import User
from Books.models import Book

# Create your models here.

class BooksPerClasses(models.Model):
    BooksPerClassesId = models.AutoField(primary_key=True)
    BooksId = models.ForeignKey(Book, related_name='BooksId',db_column='BooksId', on_delete=models.CASCADE, to_field='idbooks')
    ClassesId = models.ForeignKey(User, related_name='ClassesId',db_column='ClassesId', on_delete=models.CASCADE, to_field='idclasses')
