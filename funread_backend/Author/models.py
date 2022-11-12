from django.db import models
from Users.models import User
from Books.models import Book
# Create your models here.

class AuthorList(models.Model):
    authorlistid = models.AutoField(db_column='authorlistid', primary_key=True)  
    iduser = models.ForeignKey(User, related_name='iduserdb',db_column='iduser', on_delete=models.CASCADE, to_field='userid')
    idbook = models.ForeignKey(Book, related_name='idbookdb',db_column='idbook', on_delete=models.CASCADE, to_field='bookid')