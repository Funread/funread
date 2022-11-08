from rest_framework import routers
from  Roles import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .api import RolesViewSet

urlpatterns = [
    path('roles/listAllRoles/' , views.listed),
    path('roles/insertRoles/', views.new_role),
    path('roles/deleteRoles/<str:role>', views.deleteRole),
    path('roles/updateRoles/<str:role>',views.roleupdate), 
    path('Userroles/listAllUserRoles/' , views.listedUserRoles),
    path('Userroles/insertUserRoles/', views.new_Userrole),
    path('roles/deleteUserRoles/<str:idrole>', views.deleteUserRole),
    #path('files/searchFiles/<str:namefile>', views.filesearch),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)