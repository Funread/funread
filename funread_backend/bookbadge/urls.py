from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_bookbadge),
    path('update/', views.update_bookbadge),
    path('delete/', views.delete_bookbadge),
    path('get_badges_per_book/', views.get_badges_per_book),
]
