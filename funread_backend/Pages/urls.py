
from rest_framework import routers
from .api import PageViewSet
from Pages import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    
    path('search/<str:pageid>', views.pageSearch),
    path('change/', views.pageChange),
    path('list/', views.listed),
    path('new-page/', views.new_page),
    path('template/<str:templateerquest>', views.Template)
]

urlpatterns = format_suffix_patterns(urlpatterns)