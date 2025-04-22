from UserBadge import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('award-badge/', views.award_badge_to_user),
    path('api/user-badges/user/<int:user_id>/', views.list_user_badges),
    path('api/user-badges/<int:user_badge_id>/', views.delete_user_badge),
    path('infobadges/<int:user_id>/', views.list_user_badges_Achieved_NOT_Achieved)
]

urlpatterns = format_suffix_patterns(urlpatterns)



