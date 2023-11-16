from django.db import models
from Tags.models import Tags
from Pages.models import Pages

class TagsPerPage(models.Model):
    tagsperpageId = models.AutoField(db_column='TagsPerPageId', primary_key=True)  # Field name made lowercase.
    pageId = models.ForeignKey(Pages, db_column='PageID', blank=True, null=True, on_delete=models.CASCADE, to_field='pageid')  # Field name made lowercase.
    tagsId = models.ForeignKey(Tags, db_column='TagsID', blank=True, null=True, on_delete=models.CASCADE, to_field='tagsid')  # Field name made lowercase.

    class Meta:
        
        db_table = 'tagsperpage'