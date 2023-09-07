from openIApp import views
from django.urls import path

urlpatterns = [
    path('traslateToInglish/', views.traslateToInglish),
    path('textGenerator/', views.textGenerator),
    path('redaccionAsistent/', views.redaccionAsistent),
    path('ideaGenerator/', views.ideaGenerator),
    path('imageGenerator/', views.imageGenerator),
    path('googleTraslate/', views.google_translate)
]
