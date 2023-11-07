from  Media import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('save/', views.save_File),
    path('upload/', views.upload),
    path('list/', views.listed),
    path('change/', views.change_file)
]

urlpatterns = format_suffix_patterns(urlpatterns)