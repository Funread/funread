from UserPointsLog import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/User-PointsLog/reading/', views.award_points_for_reading),
    path('api/User-PointsLog/create/', views.award_points_for_creating_book),
    path('api/User-PointsLog/<int:user_id>/', views.get_user_points),
    path('api/User-PointsLog/<int:log_id>/', views.edit_user_points),
]

urlpatterns = format_suffix_patterns(urlpatterns)
