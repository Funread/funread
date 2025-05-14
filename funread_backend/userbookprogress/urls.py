from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_progress),
    path('update-status/', views.update_status),
    path('update-calificacion/', views.update_calificacion),
    path('delete/', views.delete_progress),
    path('get-or-create/', views.get_or_create_progress),
    path('mark-as-completed/', views.mark_as_completed),
    path('get-progress/<int:user_id>/<int:book_id>/', views.get_progress),
    path('books-completed/<int:user_id>/', views.books_completed),
]
