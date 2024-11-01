from Badges import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/badges/create/', views.create_badge),
    path('api/badges/listar/', views.list_badges),
    path('api/badges/update/<int:badge_id>/', views.update_badge),
    path('api/badges/delete/<int:badge_id>/', views.delete_badge),
    path('api/badges/list_user_badges_with_status/<int:user_id>/', views.list_user_badges_with_status)
    
]

urlpatterns = format_suffix_patterns(urlpatterns)