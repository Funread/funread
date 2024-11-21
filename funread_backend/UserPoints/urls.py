from UserPoints import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/user-points/<int:user_id>/', views.create_user_total_points),
    path('api/user-points/user/<int:user_id>/', views.get_user_total_points),
    path('api/user-points/<int:user_id>/', views.update_user_total_points_view),
    path('api/user-points/<int:user_id>/', views.delete_user_total_points),
    path('api/user-points/leaderboard/', views.leaderboard_top_10),
    path('api/user-points/rankings/<int:user_id>/', views.user_ranking_position),
    path('api/user-points/details/<int:user_id>/', views.get_user_level_and_points),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)