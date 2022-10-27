from rest_framework import routers
from .api import MailViewSet
from Mailer import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('mailer/sendMail',views.new_email), 
    path('mailer/allMail', views.listed_all_mail),
    path('mailer/inboxMail', views.inboxMail),
    path('mailer/inboxMail', views.listed_sender),
    path('mailer/inboxMail', views.new_mailcontrol),
    path('mailer/inboxMail', views.listed_all_mailcontrol)
]
