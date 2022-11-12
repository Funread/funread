
from django.db import models
from Users.models import User
from Books.models import Book

    
class SharedBooks(models.Model):
    sharedbooksid = models.AutoField(primary_key=True)
    idBook = models.ForeignKey(Book, related_name='idBook',db_column='idBook', on_delete=models.CASCADE, to_field='bookid')
    idUser = models.ForeignKey(User, related_name='idUser',db_column='idUser', on_delete=models.CASCADE, to_field='userid')

