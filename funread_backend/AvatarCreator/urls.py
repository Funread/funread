from django.urls import path
from .views import AvatarCreateView

urlpatterns = [
    path('generate/', AvatarCreateView.as_view(), name='generate_avatar'),
]