from django.urls import path
from .views import AudioTranscriptionView

urlpatterns = [
    path('transcriptions/', AudioTranscriptionView.as_view(), name='transcriptions'),
]
