from pickle import TRUE
from django.db import models
from Pages.models import Pages
class Widget(models.Model):
    widgetid = models.AutoField(db_column='widgetid', primary_key=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='type', blank=True,  null=True)
    name = models.CharField(max_length=200, db_column='name', null=True)  # Field name made lowercase.

class WidgetItem(models.Model):
    widgetitemid = models.AutoField(db_column='widgetitemid', primary_key=True)  # Field name made lowercase.
    page = models.ForeignKey(Pages, related_name='page',db_column='page', on_delete=models.CASCADE, to_field='pageid')
    widget = models.ForeignKey(Widget, related_name='widget',db_column='widget', on_delete=models.CASCADE, to_field='widgetid')  # Field name made lowercase.
    value = models.IntegerField(db_column='value', blank=True,  null=True)
    type = models.IntegerField(db_column='type', blank=True,  null=True)
