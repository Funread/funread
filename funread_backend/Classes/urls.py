from rest_framework import routers
from Classes import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('classes/createclasses', views.createclasses),
    path('classes/listedclasses', views.listedclasses),
    path('classes/changeclasses', views.classesChange),
    path('classes/deleteclasses', views.deleteclasses)
    
]
