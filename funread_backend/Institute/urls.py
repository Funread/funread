from rest_framework import routers

from Institute import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('CreateInstitute', views.createInstitute), 
    path('listInstitute', views.listedInstitute),
    path('UpdateInstitute', views.instituteChange),
    path('deleteIntitute', views.deleteInstitute),
    
    path('Members/CreateMembers', views.createMembers),
    path('Members/ListedMembers', views.listedMembers),
    path('Members/ChangeMembers', views.memberChange),
    path('Members/DeleteMembers', views.deleteMembers)
]
