from django.conf.urls import url

from . import views


urlpatterns = [
    # index URL; main page
    url(r'^$', views.index, name='index'),
]
