from django.urls import path
from Subtitled import views

urlpatterns = [
    # Otras URL de tu aplicación
    path('gettranscription/', views.GETtranscription),
    path('gettranslation/', views.GETtranslation),
]