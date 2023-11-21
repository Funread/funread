from rest_framework import routers
from  Author import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import AuthorListViewSet

urlpatterns = [
    path('listAllAuthor/' , views.listed),
    path('searchAuthorList/', views.AuthorListSearch),
    path('insertAuthorList/', views.new_Authorlist),
    path('deleteAuthorList/', views.deleteAuthorList),
    path('updateAuthorList/',views.AuthorListupdate), 
    
]

urlpatterns = format_suffix_patterns(urlpatterns)