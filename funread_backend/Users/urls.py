from rest_framework import routers
from .api import UserViewSet
from Users import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views


urlpatterns=[
    path('search/<str:email>', views.userSearch),
    path('change/', views.userChange),
    path('password/', views.userChangePassword),
    path('list/', views.listed),
    path('list-active/', views.listed_active),
    path('list-deactive/', views.listed_deactive),
    path('new-user/', views.new_user),
    path('delete_user/',views.delete_user),
    path('activate_user/',views.activate_user),
    path('login/',views.login),
    path('tokenVerify/',views.tokenVerify)
]

urlpatterns = format_suffix_patterns(urlpatterns)