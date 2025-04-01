from rest_framework import routers
from .api import OptionsViewSet
from  Options import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('new_option/', views.new_option),
    path('listed_options/', views.listed_options),
    path('update_options/', views.update_option),
    path('delete_option/', views.delete_option),
    path('list_options_by_idwidgetitem/<int:idwidgetitem>', views.list_options_by_idwidgetitem)
]

urlpatterns = format_suffix_patterns(urlpatterns)