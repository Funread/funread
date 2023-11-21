from  GroupsPerClasses import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('groupsPerClasses/listAllGroupsPerClasses/' , views.listed),
    path('groupsPerClasses/searchGroupsPerClasses/', views.search),
    path('groupsPerClasses/insertnewGroupsPerClasses/', views.add_new),
    path('groupsPerClasses/deleteGroupsPerClasses/', views.delete),
    path('groupsPerClasses/updateGroupsPerClasses/',views.update),
    path('groupsPerClasses/listedPerGroups/',views.listedPerGroups),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)