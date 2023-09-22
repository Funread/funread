from django.db import models
from Users.models import User
from Books.models import Book
# Create your models here.

class AuthorList(models.Model):
    authorlistid = models.AutoField(db_column='AuthorListId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, db_column='BookID', on_delete=models.CASCADE, to_field='bookid', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserID', on_delete=models.CASCADE, to_field='userid', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'authorlist'
