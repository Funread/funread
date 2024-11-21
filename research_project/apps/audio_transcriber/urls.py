from django.urls import path
from .views import AudioTranscriberView

urlpatterns = [
    path('transcribe/', AudioTranscriberView.as_view(), name='transcribe'),
]
