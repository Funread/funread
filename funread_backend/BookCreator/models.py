from djongo import models

# Create your models here.
class Content(models.Model):
  order = models.IntegerField(primary_key=True)
  imgUrl = models.CharField(max_length=100)
  text = models.CharField(max_length=100)
  page = models.ForeignKey(
    'Page',
    related_name='content',
    related_query_name='contents',
    on_delete=models.CASCADE
  )
class Page(models.Model):
  pageNumber = models.IntegerField(primary_key=True)
  contentsList = models.ManyToManyField(
    'Content',
    related_name='pages',
    related_query_name='pages'
  )
class BookCreator(models.Model):
   #TODO from oscar: add UnitName field
  id = models.CharField(max_length=100, primary_key=True)
  name = models.CharField(max_length=100)
  description = models.CharField(max_length=100)
  type = models.CharField(max_length=100)
  teacherId = models.CharField(max_length=100)
  
  


 


