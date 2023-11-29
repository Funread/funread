from rest_framework import routers
from  Sharedbooks import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import SharedBooksViewSet

urlpatterns = [
    path('listAllSharedBooks/' , views.listed),
    path('searchSharedBooks/', views.search),
    path('insertnewSharedBooks/', views.add_new),
    path('deleteSharedBooks/', views.delete),
    path('updateSharedBooks/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)