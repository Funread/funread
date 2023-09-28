from  Media import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('save/', views.save_Image),
    path('upload/', views.upload)
]

urlpatterns = format_suffix_patterns(urlpatterns)