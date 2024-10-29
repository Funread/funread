from User_Levels import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('userlevels/create/', views.create_user_level),
    path('userlevels/list/', views.list_user_levels),
    path('userlevels/<int:user_level_id>/', views.get_user_level),
    path('userlevels/update/<int:user_level_id>/', views.update_user_level),
    path('userlevels/delete/<int:user_level_id>/', views.delete_user_level),
    
    
]

urlpatterns = format_suffix_patterns(urlpatterns)