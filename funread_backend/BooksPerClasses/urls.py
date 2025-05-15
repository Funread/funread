from rest_framework import routers
from  BooksPerClasses import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import BooksPerClassesViewSet

urlpatterns = [
    path('listAllBooksPerClasses/' , views.listed),
    path('listBooksPerClassesid/<str:classid>', views.listedid),
    path('insertnewBooksPerClasses/', views.add_new),
    path('deleteBooksPerClasses/', views.delete),
    path('updateBooksPerClasses/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)