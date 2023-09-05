from rest_framework import routers
from .api import UserViewSet
from Users import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import login

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

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
    #path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/',views.login),
    #path('login/',views.login)
]

urlpatterns = format_suffix_patterns(urlpatterns)