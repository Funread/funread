from django.db import models
from Tags.models import Tags
from Pages.models import Pages

# Create your models here.

class TagsPerPage(models.Model):
    tagsPerPageId = models.AutoField(primary_key=True)
    pageId = models.ForeignKey(Pages, related_name='pageId',db_column='pageId', on_delete=models.CASCADE, to_field='pageid')
    tagsId = models.ForeignKey(Tags, related_name='tagsIdmodel',db_column='tagsId', on_delete=models.CASCADE, to_field='tagsId')
