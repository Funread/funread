
from django.db import models
from Users.models import User
from Books.models import Book

    
class SharedBooks(models.Model):
    sharedbooksid = models.AutoField(primary_key=True)
    idbook = models.ForeignKey(Book, related_name='idbook',db_column='idbook', on_delete=models.CASCADE, to_field='bookid')
    iduser = models.ForeignKey(User, related_name='iduser',db_column='iduser', on_delete=models.CASCADE, to_field='userid')

