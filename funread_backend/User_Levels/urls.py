from User_Levels import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/user-levels/', views.create_user_level),
    path('api/user-levels/', views.list_user_levels),
    path('api/user-levels/<int:user_level_id>/', views.get_user_level),
    path('api/user-levels/<int:user_level_id>/', views.update_user_level),
    path('api/user-levels/<int:user_level_id>/', views.delete_user_level),
    
    
]

urlpatterns = format_suffix_patterns(urlpatterns)