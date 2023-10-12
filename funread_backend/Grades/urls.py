from rest_framework import routers
from .api import GradeViewSet
from Grades import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

#---------------------las urls van en base de la carpeta del view------------------
urlpatterns = [
    path('grades/creategrade',views.creategrade), 
    path('grades/gradechange/', views.gradechange),
    path('grades/deletegrade', views.deletegrade),
    path('grades/listgrade', views.readgrade),
    path('grades/listgradeperstudent', views.readgradeid),

]

