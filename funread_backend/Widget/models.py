from pickle import TRUE
from django.db import models
from Pages.models import Pages

class Widget(models.Model):
    widgetid = models.AutoField(db_column='WidgetId', primary_key=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'widget'

class WidgetItem(models.Model):
    widgetitemid = models.AutoField(db_column='WidgetItemId', primary_key=True)  # Field name made lowercase.
    pageid = models.ForeignKey(Pages, db_column='PageId', blank=True, null=True, on_delete=models.CASCADE, to_field='pageid')  # Field name made lowercase.
    widgetid = models.ForeignKey(Widget, db_column='WidgetId', blank=True, null=True, on_delete=models.CASCADE, to_field='widgetid')  # Field name made lowercase.
    value = models.IntegerField(db_column='Value', blank=True,  null=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type', blank=True,  null=True)  # Field name made lowercase.

    class Meta:
        
        db_table = 'widgetitem'