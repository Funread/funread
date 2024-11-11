from django.urls import path
from .views import AvatarCreateView

urlpatterns = [
    path('AvatarCreator/', AvatarCreateView.as_view(), name='AvatarCreator'),
]