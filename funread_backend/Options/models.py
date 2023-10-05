from django.db import models
from Media.models import Media
from Widget.models import WidgetItem
from Users.models import User

# Create your models here.

class Options(models.Model):
    idoption = models.AutoField(primary_key=True)
    answer = models.CharField(max_length=500)
    points = models.IntegerField(blank=True, null=True)
    iscorrect = models.IntegerField(blank=True, null=True)
    idimage = models.ForeignKey(Media, blank=True, null=True, on_delete=models.CASCADE, to_field='id')
    idwidgetitem = models.ForeignKey(WidgetItem, blank=True, null=True, on_delete=models.CASCADE, to_field='widgetitemid')
    isactive = models.IntegerField(blank=True, null=True)
    createdby = models.ForeignKey(User, on_delete=models.CASCADE, to_field='userid')
    createdat = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'options'