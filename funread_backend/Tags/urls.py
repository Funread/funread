from rest_framework import routers
from .api import TagsViewSet
from  Tags import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('listAllTags/' , views.listed),
    path('insertTags/', views.new_tags),
    path('searchTags/<str:description>', views.tagsSearch),
    path('updateTags/<str:description>',views.tagsChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)