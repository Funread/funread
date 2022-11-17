from rest_framework import routers
from  GroupsPerClasses import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import GroupsPerClassesViewSet

urlpatterns = [
    path('groupsPerClasses/listAllGroupsPerClasses/' , views.listed),
    path('groupsPerClasses/searchGroupsPerClasses/', views.search),
    path('groupsPerClasses/insertnewGroupsPerClasses/', views.add_new),
    path('groupsPerClasses/deleteGroupsPerClasses/', views.delete),
    path('groupsPerClasses/updateGroupsPerClasses/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)