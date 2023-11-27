from rest_framework import routers
from .api import GradeViewSet
from Grades import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

#---------------------las urls van en base de la carpeta del view------------------
urlpatterns = [
    path('creategrade',views.creategrade), 
    path('gradechange/', views.gradechange),
    path('deletegrade', views.deletegrade),
    path('listgrade', views.readgrade),
    path('listgradeperstudent', views.readgradeid),

]

