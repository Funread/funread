
from rest_framework import routers
from .api import PageViewSet
from Pages import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    
    path('pages/searchPage/<str:pageid>', views.pageSearch),
    path('pages/changePage/', views.pageChange),
    path('pages/listallPages/', views.listed),
    path('pages/insertPage/', views.new_page),
    path('template/getTemplate<str:templateerquest>', views.Template)
]

urlpatterns = format_suffix_patterns(urlpatterns)