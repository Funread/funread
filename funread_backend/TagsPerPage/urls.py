from rest_framework import routers
from  TagsPerPage import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import TagsPerPageViewSet

urlpatterns = [
    path('listAllTagsPerPage/' , views.listed),
    path('searchTagsPerPage/', views.search),
    path('insertnewTagsPerPage/', views.add_new),
    path('deleteTagsPerPage/', views.delete),
    path('updateTagsPerPage/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)