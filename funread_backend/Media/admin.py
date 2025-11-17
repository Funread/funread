from django.contrib import admin
from .models import Media

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'galleryType', 'isfunreadMedia')
    list_filter = ('type', 'galleryType', 'isfunreadMedia')