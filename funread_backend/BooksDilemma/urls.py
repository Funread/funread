from rest_framework import routers
from BooksDilemma import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns=[
    path('searchdilemma/<str:bookdimensionid>',views.search_dilemma),
    path('searchdimension/<str:bookcategoryid>',views.search_dimesion),
    path('searchcategory/<str:bookcategoryid>',views.search_category),
    path('searchdilemmaperbook/<str:bookid>',views.search_dilemmaperbook),
    path('listdilemma/',views.list_dilemma),
    path('listdimension/',views.list_dimesion),
    path('listcategory/',views.list_category),
    path('listdilemmaperbook/',views.list_dilemmaperbook),
    path('newdilemma/',views.new_dilemma),
    path('newdimension/',views.new_dimesion),
    path('newcategory/',views.new_category),
    path('newdilemmaperbook/',views.new_dilemmaperbook),
    path('changedilemma/',views.change_dilemma),
    path('changedimension/',views.change_dimesion),
    path('changecategory/',views.change_category),
    path('changedilemmaperbook/',views.change_dilemmaperbook),
    path('getcategoryperbook/<str:bookid>',views.get_category_per_book),
]

urlpatterns = format_suffix_patterns(urlpatterns)