from  GroupsCreate import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('new_group/', views.new_group),
    path('listedCreateby/<int:createdby>', views.listedCreateby),
    path('delete_groups/', views.deletegroup),
    path('search-by-name/',views.search_by_name)
]

urlpatterns = format_suffix_patterns(urlpatterns)