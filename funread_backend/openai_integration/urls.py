from django.urls import path
from .views import GrammarAssistantView

urlpatterns = [
    path('grammar-assistant/', GrammarAssistantView.as_view(), name='grammar-assistant'),
]
