from rest_framework import routers
from .api import FolderViewSet
from  folder import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('list/' , views.listed),
    path('newFolder/', views.new_folder),
    path('delete/<str:nameFolders>', views.deleteFolder),
    path('search/<str:nameFolders>', views.FolderSearch),
    path('change/',views.folderChange),
]

urlpatterns = format_suffix_patterns(urlpatterns)