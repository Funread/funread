from django.urls import re_path, path
from BookCreator import views

urlpatterns=[
    path('', views.book_creator),
]
