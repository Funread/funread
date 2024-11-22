from django.urls import path
from .views import AudioComparatorView

urlpatterns = [
    path('compare-audio/', AudioComparatorView.as_view(), name='compare_audio'),
]
