from rest_framework import routers
from  Roles import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import RolesViewSet

urlpatterns = [
    path('roles/listAllRoles/' , views.listedRoles),
    path('roles/searchRoles/', views.searchRoles),
    path('roles/insertRoles/', views.newRole),
    path('roles/deleteRoles/', views.deleteRole),
    path('roles/updateRoles/',views.updateRole), 
    path('userroles/listAllUserRoles/' , views.listedUserRoles),
    path('userroles/insertUserRoles/', views.new_Userrole),
    path('userroles/deleteUserRoles/<str:pk>', views.deleteUserRole),
    path('userroles/searchUserRoles/<str:pk>', views.UserRolesSearch),
    path('userroles/updateUserRoles/<str:pk>',views.userroleupdate),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)