from Badges import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # Endpoints existentes
    path('create/', views.create_badge),
    path('listAll/', views.list_badges),
    path('update/<int:badge_id>/', views.update_badge),
    path('delete/<int:badge_id>/', views.delete_badge),
    path('listByuser/<int:user_id>/', views.list_user_badges_with_status),
    
    # Endpoints de administrador
    path('admin/', views.list_all_badges_admin),
    path('admin/create/', views.create_badge_admin),
    path('admin/update/<int:badge_id>/', views.update_badge_admin),
    path('admin/delete/<int:badge_id>/', views.delete_badge_admin),
    path('admin/detail/<int:badge_id>/', views.get_badge_detail_admin),
    path('admin/assign-all/', views.trigger_badge_assignment_all),
    
    # Endpoints de asignación automática
    path('assign/<int:user_id>/', views.assign_badges_by_books),
    path('progress/<int:user_id>/', views.get_user_progress_badges),
]

urlpatterns = format_suffix_patterns(urlpatterns)