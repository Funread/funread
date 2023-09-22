from django.db import models
from Tags.models import Tags
from Books.models import Book

# Create your models here.

class Tagsperbook(models.Model):
    tagsperbookid = models.AutoField(db_column='TagsPerBookId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, db_column='BookId', blank=True, null=True, on_delete=models.CASCADE, to_field='bookid')  # Field name made lowercase.
    tagsid = models.ForeignKey(Tags, db_column='TagsID', blank=True, null=True, on_delete=models.CASCADE, to_field='tagsid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'tagsperbook'

#agregar URL y views