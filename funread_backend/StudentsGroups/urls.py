from rest_framework import routers
from  StudentsGroups import views 
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import StudentsGroupsViewSet

urlpatterns = [
    path('listAllStudentsGroups/' , views.listed),
    path('searchStudentsGroups/', views.listedPerGroups),
    path('insertnewStudentsGroups/', views.add_new),
    path('deleteStudentsGroups/', views.delete),
    path('updateStudentsGroups/',views.update),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)