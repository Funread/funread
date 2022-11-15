from rest_framework import routers
from  StudentsGroups import views 
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import StudentsGroupsViewSet

urlpatterns = [
    path('studentsgroups/listAllStudentsGroups/' , views.listed),
    path('studentsgroups/searchStudentsGroups/', views.search),
    path('studentsgroups/insertnewStudentsGroups/', views.add_new),
    path('studentsgroups/deleteStudentsGroups/', views.delete),
    path('studentsgroups/updateStudentsGroups/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)