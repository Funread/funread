from rest_framework import routers
from  Author import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import AuthorListViewSet

urlpatterns = [
    path('AuthorList/listAllAuthor/' , views.listed),
    path('AuthorList/searchAuthorList/<str:pk>', views.AuthorListSearch),
    path('AuthorList/insertAuthorList/', views.new_Authorlist),
    path('AuthorList/deleteAuthorList/<str:pk>', views.deleteAuthorList),
    path('AuthorList/updateAuthorList/<str:pk>',views.AuthorListupdate), 
    
]

urlpatterns = format_suffix_patterns(urlpatterns)