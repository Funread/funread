from django.db import models
from Users.models import User
from Books.models import Book
# Create your models here.

class AuthorList(models.Model):
    authorlistid = models.AutoField(primary_key=True)  
    userId= models.ForeignKey(User, related_name='iduserdb',db_column='userId', on_delete=models.CASCADE, to_field='userid')
    bookId = models.ForeignKey(Book, related_name='idbookdb',db_column='bookId', on_delete=models.CASCADE, to_field='bookid')