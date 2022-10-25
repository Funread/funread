from rest_framework import routers
from .api import FileViewSet
from  Files import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('list/' , views.listed),
    path('newfile/', views.new_file),
    path('delete/<str:namefile>', views.deletefile), 
    #path('search/<str:description>', views.tagsSearch),
    #path('change/<str:description>',views.tagsChange), 
]

urlpatterns = format_suffix_patterns(urlpatterns)