# avatar_creator/urls.py

from django.urls import path
from .views import AvatarCreateView

urlpatterns = [
    path('create-avatar/', AvatarCreateView.as_view(), name='create-avatar'),
]