from rest_framework import routers
from ClassesLog import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    path('classeslog/createclasseslog', views.createclasseslog),
    path('classeslog/listedclasseslog', views.listedclasseslog),
    path('classeslog/changeclasseslog', views.classeslogchange),
    path('classeslog/deleteclasseslog', views.deleteclasseslog)
    
]
