from Badges import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('create/', views.create_badge),
    path('listAll/', views.list_badges),
    path('update/<int:badge_id>/', views.update_badge),
    path('delete/<int:badge_id>/', views.delete_badge),
    path('listByuser/<int:user_id>/', views.list_user_badges_with_status),
    # path('listByuser/Achieved-NOT-Achieved/<int:user_id>/', views.list_user_badges_Achieved_NOT_Achieved),
    
    
]

urlpatterns = format_suffix_patterns(urlpatterns)