from rest_framework import routers
from Classes import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('createClasses', views.createclasses),
    path('listedClasses', views.listedclasses),
    path('changeClasses', views.classesChange),
    path('deleteClasses', views.deleteclasses),
    path('listedClassesid', views.listedclassesid),
   
]