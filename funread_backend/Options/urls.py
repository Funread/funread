from  Options import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('new_option/', views.new_option),
    path('listed_options/', views.listed_options),
    path('update_options/', views.update_option),
    path('delete_option/', views.delete_option)
]

urlpatterns = format_suffix_patterns(urlpatterns)