
from django.db import models
from Users.models import User
from Books.models import Book

    
class SharedBooks(models.Model):
    sharedbooksid = models.AutoField(primary_key=True)
    bookId= models.ForeignKey(Book, null = True, related_name='bookIdModel',db_column='bookId', on_delete=models.CASCADE, to_field='bookid')
    userId = models.ForeignKey(User, blank=True, null=True, related_name='userIdmodel',db_column='userId', on_delete=models.CASCADE, to_field='userid')

