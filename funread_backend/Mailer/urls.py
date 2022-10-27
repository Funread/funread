from rest_framework import routers
from .api import MailViewSet
from Mailer import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('mailer/sendMail',views.new_email), 
    path('mailer/allMail', views.listed_all_mail),
    path('mailer/inboxMail', views.inboxMail)
]
