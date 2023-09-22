from django.db import models
from Users.models import User
from Books.models import Book

class Grades(models.Model):
    gradesid = models.AutoField(db_column='GradesID', primary_key=True)  # Field name made lowercase.
    booksid = models.ForeignKey(Book, db_column='BookID', on_delete=models.CASCADE, to_field='bookid') 
    progress = models.IntegerField(db_column='Progress', blank=True, null=True)  # Field name made lowercase.
    grade = models.FloatField(db_column='Grade', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserId', on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'grades'