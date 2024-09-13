from django.urls import path
from .views import OpenAIChatView

urlpatterns = [
    path('chat/', OpenAIChatView.as_view(), name='openai_chat'),
]
