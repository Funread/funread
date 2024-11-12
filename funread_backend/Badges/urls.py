from Badges import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/badges/', views.create_badge),
    path('api/badges/', views.list_badges),
    path('api/badges/<int:badge_id>/', views.update_badge),
    path('api/badges/<int:badge_id>/', views.delete_badge),
    path('api/badges/user/<int:user_id>/', views.list_user_badges_with_status)
    
]

urlpatterns = format_suffix_patterns(urlpatterns)