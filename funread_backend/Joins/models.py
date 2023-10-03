from django.db import models
from Books.models import Book
from Classes.models import Classes

class CustomAutoField(models.AutoField): #Se utilizara el id como codigo de union, por lo que creamos una clase custom para no iniciar desde 1
    def __init__(self, *args, **kwargs):
        kwargs['editable'] = False
        kwargs['default'] = 123456
        super().__init__(*args, **kwargs)

class Joins(models.Model):
    joinid = models.AutoField(db_column='joinId', primary_key=True)  # Field name made lowercase.
    code = models.TextField(db_column='code', blank=False, null=False)  # Field name made lowercase.
    password = models.TextField(db_column='password', max_length=256, blank=False, null=False)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, db_column='bookId', on_delete=models.CASCADE, to_field='bookid', null=True)
    classesId = models.ForeignKey(Classes, db_column='classesId', on_delete=models.CASCADE, to_field='classesid', null=True)

    class Meta:
        
        db_table = 'invitations'


