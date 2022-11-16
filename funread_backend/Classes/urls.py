from rest_framework import routers
from Classes import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('classes/createClasses', views.createclasses),
    path('classes/listedClasses', views.listedclasses),
    path('classes/changeClasses', views.classesChange),
    path('classes/deleteClasses', views.deleteclasses)
    
]
