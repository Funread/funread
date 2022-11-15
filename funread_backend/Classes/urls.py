from rest_framework import routers
from Classes import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('Classes/CreateClasses', views.createclasses),
    path('Classes/ListedClasses', views.listedclasses),
    path('Classes/ChangeClasses', views.classesChange),
    path('Classes/DeleteClasses', views.deleteclasses)
    
]
