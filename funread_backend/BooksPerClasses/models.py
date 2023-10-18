from django.db import models
from Classes.models import Classes
from Books.models import Book

class BooksPerClasses(models.Model):
    booksperclasses = models.AutoField(db_column='BooksPerClasses', primary_key=True)  # Field name made lowercase.
    booksid = models.ForeignKey(Book, db_column='BooksId', blank=True, null=True, on_delete=models.CASCADE, to_field='bookid')  # Field name made lowercase.
    classesid = models.ForeignKey(Classes, db_column='ClassesId', on_delete=models.CASCADE, to_field='classesid', blank=True, null=True)  # Field name made lowercase.
    order = models.IntegerField(db_column='Order', blank=True, null=True)
    isactive = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'booksperclasses'