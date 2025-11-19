from django.db import models
from Users.models import User

class Media(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300, unique=True)
    extension = models.CharField(max_length=10)
    file = models.FileField(blank=True, upload_to='media/')
    type = models.IntegerField(null=False)
    galleryType = models.IntegerField(db_column='galleryType', null=True, blank=True)
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        db_column='user_id',
        to_field='userid',
        related_name='media_files'
    )

    isfunreadMedia = models.BooleanField(default=False)

    # galleryType para saber la categoría de imagen
    # 1 userCustom
    # 2 FunRead Gallery
    # 3 Personajes
    # 4 Escenarios
    # 5 Object
    # 6 Others
    # 7 BookCover

    # type es un enum:
    # 1 = Imagen
    # 2 = Audio
    # 3 = Video

    class Meta:
        db_table = 'media'
