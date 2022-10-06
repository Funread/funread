from djongo import models

# Create your models here.
class Content(models.Model):
  order = models.IntegerField(primary_key=True)
  dataType = models.CharField(max_length=100)
  value = models.CharField(max_length=256)
  
class Page(models.Model):
  pageNumber = models.IntegerField(primary_key=True)
  contentsList = models.ArrayField(model_container=Content)
  

  
  


 


