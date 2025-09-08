from django.db import models

# Create your models here.

class Media(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300,unique=True)
    extension = models.CharField(max_length=10)
    file = models.FileField(blank='', default="", upload_to='media/')
    type = models.IntegerField(null=False) 
    galleryType = models.IntegerField(db_column='galleryType', null=True, blank=True)

    #galleryType para saber la categoria de imagen
    #1 userCustom
    #2 FunRead Gallery
    #3 Personajes
    #4 Escenarios
    #5 Object

    # type es un enum, distribuido de la siguiente manera
    # 1 = Imagen
    # 2 = Audio
    # 3 = Video 

    class Meta:
        db_table = 'media'