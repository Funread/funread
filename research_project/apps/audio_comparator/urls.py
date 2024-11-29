from django.urls import path
from .views import AudioComparatorView

urlpatterns = [
    path('', AudioComparatorView.as_view(), name='audio_comparator'),
]