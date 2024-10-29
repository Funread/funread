from UserPointsLog import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/UserPointsLog/reading/', views.award_points_for_reading),
    path('api/UserPointsLog/create/', views.award_points_for_creating_book),
    path('api/UserPointsLog/consult/<int:user_id>/', views.get_user_points),
    path('api/UserPointsLog/edit/<int:log_id>/', views.edit_user_points),
]

urlpatterns = format_suffix_patterns(urlpatterns)
