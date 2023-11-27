from rest_framework import routers
from  GroupsPerClasses import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import GroupsPerClassesViewSet

urlpatterns = [
    path('listAllGroupsPerClasses/' , views.listed),
    path('searchGroupsPerClasses/', views.search),
    path('insertnewGroupsPerClasses/', views.add_new),
    path('deleteGroupsPerClasses/', views.delete),
    path('updateGroupsPerClasses/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)