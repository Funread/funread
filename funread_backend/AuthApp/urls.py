from django.urls import path
from django.contrib.auth import views as auth_views

from .views import (
    LoginAPIView, RegistrationAPIView,
)

urlpatterns = [
  path('login/', LoginAPIView.as_view()),
  path('register/', RegistrationAPIView.as_view())
  
]