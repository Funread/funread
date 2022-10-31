from rest_framework import routers
from  Files import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import FileViewSet

urlpatterns = [
    path('list/' , views.listed),
    path('newfile/', views.new_file),
    path('delete/<str:namefile>', views.deleteFile), 
    path('search/<str:namefile>', views.filesearch),
    #path('change/<str:description>',views.tagsChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)