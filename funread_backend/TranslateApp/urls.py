from TranslateApp import views
from django.urls import path

urlpatterns = [
    path('googleTraslate/', views.google_translate),
    path('texttospeech/', views.text_to_speech)
]
