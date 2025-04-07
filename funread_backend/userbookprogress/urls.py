from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_progress),
    path('update-status/', views.update_status),
    path('update-calificacion/', views.update_calificacion),
    path('delete/', views.delete_progress),
]
