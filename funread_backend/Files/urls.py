from rest_framework import routers
from  Files import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import FileViewSet

urlpatterns = [
    path('listAllFiles/' , views.listed),
    path('insertFiles/', views.new_file),
    path('deleteFiles/<str:namefile>', views.deleteFile), 
    path('searchFiles/<str:namefile>', views.filesearch),
    path('updateFiles/<str:namefile>',views.fileChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)
