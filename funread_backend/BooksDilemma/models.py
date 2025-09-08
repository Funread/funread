from django.db import models
from Books.models import Book


class BookCategory(models.Model):
    bookcategoryid = models.AutoField(db_column='BookCategoryID', primary_key=True)
    name = models.CharField(db_column='CategoryName', max_length=100)
    description = models.CharField(db_column='Description', max_length=500, blank=True, null=True)
    class Meta:
        db_table = 'bookcategory'

class BookDimension(models.Model):
    bookdimensionid = models.AutoField(db_column='BookDimensionID', primary_key=True)
    name = models.CharField(db_column='DimensionName', max_length=150)
    description = models.CharField(db_column='Description', max_length=500, blank=True, null=True)
    bookcategoryid = models.ForeignKey(BookCategory, db_column='BookCategoryID', related_name='DilemmaPerBook_book_category_dimension', null=False, on_delete=models.CASCADE, to_field='bookcategoryid')
    class Meta:
        db_table = 'bookdimension'

class BookDilemma(models.Model):
    bookdilemmaid = models.AutoField(db_column='BookDilemmaID', primary_key=True,)
    dilemma = models.CharField(db_column='Dilemma', max_length=500)
    description = models.CharField(db_column='Description', max_length=500, blank=True, null=True)
    bookdimensionid = models.ForeignKey(BookDimension, db_column='BookDimensionID', related_name='DilemmaPerBook_book_dimension_dilemma', null=False, on_delete=models.CASCADE, to_field='bookdimensionid')
    class Meta:
        db_table = 'bookdilemma'

class DilemmaPerBook(models.Model):
    dilemmaperbookid = models.AutoField(db_column='DilemmaPerBookID', primary_key=True)
    bookdilemmaid = models.ForeignKey(BookDilemma, db_column='BookDilemmaID', related_name='DilemmaPerBook_book_dilemma_dilemma', null=False, on_delete=models.CASCADE, to_field='bookdilemmaid')
    bookid = models.ForeignKey(Book, db_column='BookID', related_name='DilemmaPerBook_book_id_book', null=False, on_delete=models.CASCADE, to_field='bookid')
    class Meta:
        db_table = 'dilemmaperbook'
