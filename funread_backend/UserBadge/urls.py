from UserBadge import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/userbadges/', views.award_badge_to_user),
    path('api/userbadges/list/<int:user_id>/', views.list_user_badges),
    path('api/userbadges/delete/<int:user_badge_id>/', views.delete_user_badge),
     
]

urlpatterns = format_suffix_patterns(urlpatterns)



