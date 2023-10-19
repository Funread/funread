from django.urls import path
from Subtitled import views

urlpatterns = [
    # Otras URL de tu aplicación
    path('transcribe_audio/', views.transcribe_video_audio),
]