
from django.db import models
from Users.models import User
from Books.models import Book

class SharedBooks(models.Model):
    sharedbooksid = models.AutoField(db_column='SharedBooksId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, db_column='BookID', blank=True, null=True, on_delete=models.CASCADE, to_field='bookid')  # Field name made lowercase.
    userid = models.ForeignKey(User, db_column='UserID', blank=True, null=True, on_delete=models.CASCADE, to_field='userid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'sharedbooks'