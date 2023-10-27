
from rest_framework import routers
from .api import PageViewSet
from Pages import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    
    path('searchPage/<str:pageid>', views.pageSearch),
    path('changePage/', views.pageChange),
    path('listallPages/', views.listed),
    path('insertPage/', views.new_page),
    path('getTemplate<str:templateerquest>', views.Template)
]

urlpatterns = format_suffix_patterns(urlpatterns)