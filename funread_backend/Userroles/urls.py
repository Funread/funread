from rest_framework import routers
from  Userroles import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('listAllUserRoles/' , views.listAll),
    path('insertUserRoles/', views.new_userrole),
    path('listedStudents/', views.listedStudents)
    # path('userroles/deleteUserRoles/<str:pk>', views.deleteUserRole),
    # path('userroles/searchUserRoles/<str:pk>', views.UserRolesSearch),
    # path('userroles/updateUserRoles/<str:pk>',views.userroleupdate),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)