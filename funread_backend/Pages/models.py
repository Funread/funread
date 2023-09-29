from django.db import models
from Books.models import Book

class Pages(models.Model):
    pageid = models.AutoField(db_column='PageId', primary_key=True)  # Field name made lowercase.
    bookid = models.ForeignKey(Book, db_column='BookId', blank=True, null=True, on_delete=models.CASCADE, to_field='bookid')  # Field name made lowercase.
    type = models.IntegerField(db_column='Type')  # Field name made lowercase.
    template = models.IntegerField(db_column='Template')  # Field name made lowercase.
    elementorder = models.IntegerField(db_column='ElementOrder')  # Field name made lowercase.

    class Meta:
        
        db_table = 'pages'