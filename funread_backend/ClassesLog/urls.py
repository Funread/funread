from rest_framework import routers
from ClassesLog import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('createclasseslog', views.createclasseslog),
    path('listedclasseslog', views.listedclasseslog),
    path('changeclasseslog', views.classeslogchange),
    path('deleteclasseslog', views.deleteclasseslog)
    
]
