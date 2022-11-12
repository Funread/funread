from rest_framework import routers

from Institute import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('Institute/CreateInstitute', views.createInstitute), 
    path('Institute/listInstitute', views.listedInstitute),
    path('Institute/UpdateInstitute', views.instituteChange),
    path('Institute/deleteIntitute', views.deleteInstitute),
    
    path('InstituteMembers/CreateMembers', views.createMembers),
    path('InstituteMembers/ListedMembers', views.listedMembers),
    path('InstituteMembers/ChangeMembers', views.memberChange),
    path('InstituteMembers/DeleteMembers', views.deleteMembers)
]
