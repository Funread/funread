from rest_framework import routers
from .api import BookViewSet
from BookCreator import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    path('search/<str:title>', views.bookSearch),
    path('change/', views.bookChange),
    path('list/', views.listed),
    path('list-published/', views.listed_PublishedBooks),
    path('list-notPublished/', views.listed_NotPublishedBooks),
    path('list-private/', views.listed_PrivateBooks),
    path('new-book/', views.new_book),
    path('modify-state-private/', views.new_book),
    path('modify-state-publish/',views.modifyStateToPrivate)
]

urlpatterns = format_suffix_patterns(urlpatterns)