from rest_framework import routers
from .api import BookViewSet
from Books import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    path('search/<str:title>', views.bookSearch),
    path('change/', views.bookChange),
    path('list/', views.listed),
    path('listDetails/', views.listedDetails),
    path('list-published/', views.listed_PublishedBooks),
    path('list-notPublished/', views.listed_NotPublishedBooks),
    path('list-private/', views.listed_PrivateBooks),
    path('new-book/', views.new_book),
    path('modify-state-private/', views.modifyStateToPrivate),
    path('modify-state-publish/',views.modifyStateToPublish),
    path('search-by-title/',views.search_by_title),
    path('full-book/<str:bookid>',views.get_all_book_relations),
    path('book-by-id/<str:bookid>',views.bookSearchById)
]

urlpatterns = format_suffix_patterns(urlpatterns)