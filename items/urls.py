from django.conf.urls import url

from . import views


urlpatterns = [
    # /items/
    # a list of all current items
    url(r'^$', views.list_items, name='item_list'),
    # /items/add
    # 'add new item' page
    url(r'^add/', views.add_item, name='add_item'),
]
