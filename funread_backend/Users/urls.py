from django.urls import path
from .views import UsersView,UserPutInfo,UserPutPassword

urlpatterns = [
    path('list/', UsersView.as_view(), name='users_list'),
    path('search/users/<int:id>', UsersView.as_view(), name='search_process'),
    path('new/users/', UsersView.as_view(), name='new_process'),
    path('modify/users/<int:userid>', UserPutInfo.as_view(), name='change_info_process'),
    path('changePassword/users/<int:userid>', UserPutPassword.as_view(), name='change_password_process'),
    path('eliminate/users/<int:userid>', UsersView.as_view(), name='eliminate_process')
    
]