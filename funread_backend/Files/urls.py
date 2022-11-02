from rest_framework import routers
from  Files import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import FileViewSet

urlpatterns = [
    path('files/listAllFiles/' , views.listed),
    path('files/insertFiles/', views.new_file),
    path('files/deleteFiles/<str:namefile>', views.deleteFile), 
    path('files/searchFiles/<str:namefile>', views.filesearch),
    path('files/updateFiles/<str:namefile>',views.fileChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)
