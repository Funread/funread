from  Media import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('save/', views.save_File),
    path('upload/', views.upload),
    path('list/', views.listed),
    path('list_audios/', views.listed_Audios),
    path('list_images/', views.listed_Images),
    path('list_videos/', views.listed_Videos),
    path('change/', views.change_file),
    # Admin endpoints
    path('by-type/<int:gallery_type>/', views.get_media_by_type),
    path('delete/<int:media_id>/', views.delete_media),
    path('all/', views.get_all_media),
]

urlpatterns = format_suffix_patterns(urlpatterns)