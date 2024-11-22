from django.urls import path
from .views import AudioToTextView

urlpatterns = [
    path('', AudioToTextView.as_view(), name='audio_transcriber'),  # Vacío aquí porque ya tiene el prefijo desde el general
]
