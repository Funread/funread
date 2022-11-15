from rest_framework import routers
from  TagsPerPage import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import TagsPerPageViewSet

urlpatterns = [
    path('tagsPerPage/listAllTagsPerPage/' , views.listed),
    path('tagsPerPage/searchTagsPerPage/', views.search),
    path('tagsPerPage/insertnewTagsPerPage/', views.add_new),
    path('tagsPerPage/deleteTagsPerPage/', views.delete),
    path('tagsPerPage/updateTagsPerPage/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)