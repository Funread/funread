
from IAuggingFace import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/huggingface/', views.pregunta_huggingface, name='pregunta_huggingface'),
]


urlpatterns = format_suffix_patterns(urlpatterns)