from rest_framework import routers
from  BooksPerClasses import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import BooksPerClassesViewSet

urlpatterns = [
    path('booksPerClasses/listAllBooksPerClasses/' , views.listed),
    path('booksPerClasses/searchBooksPerClasses/', views.search),
    path('booksPerClasses/insertnewBooksPerClasses/', views.add_new),
    path('booksPerClasses/deleteBooksPerClasses/', views.delete),
    path('booksPerClasses/updateBooksPerClasses/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)