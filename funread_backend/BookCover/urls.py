from django.urls import path
from .views import BookCoverCreateView

urlpatterns = [
    path('generate/', BookCoverCreateView.as_view(), name='generate_book_cover')
]
