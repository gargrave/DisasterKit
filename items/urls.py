from django.conf.urls import url

from . import views


urlpatterns = [
    # index URL; main page
    url(r'^$', views.index, name='index'),
    # 'add new item' page
    # url is form of '.../add'
    url(r'^add/', views.add_item, name='add'),
]
