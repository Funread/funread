from UserPoints import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('userpoints/create/<int:user_id>/', views.create_user_total_points),
    path('userpoints/get_user_total_points/<int:user_id>/', views.get_user_total_points),
    path('userpoints/update/<int:user_id>/', views.update_user_total_points_view),
    path('userpoints/delete/<int:user_id>/', views.delete_user_total_points),
    path('userpoints/leaderboard_top_10/', views.leaderboard_top_10),
    path('userpoints/user_ranking_position/<int:user_id>/', views.user_ranking_position),
    path('userpoints/get_user_total_points_and_Levels/<int:user_id>/', views.get_user_level_and_points),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)