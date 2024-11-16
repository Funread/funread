from django.urls import path
from . import views

urlpatterns = [
    path('Transcribe/', views.transcribe_audio, name='transcribe_audio'),
]
