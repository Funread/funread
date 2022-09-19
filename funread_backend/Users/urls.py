from rest_framework import routers
from .api import UserViewSet
from Users import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    path('user/<int:pk>/', views.user),
    path('list/', views.list),
]

urlpatterns = format_suffix_patterns(urlpatterns)