from django.conf.urls import url

from . import views
from .views import ItemDetailView


urlpatterns = [
    # /items/
    # a list of all current items
    url(r'^$', views.list_items, name='item_list'),

    # /items/add
    # 'add new item' page
    url(r'^add/', views.add_item, name='add_item'),

    # /items/delete/<id>
    # deactivates an item, so it will not be listed anymore
    url(r'^delete/(?P<pk>\d+)/?$', views.deactivate_item, name='deactivate_item'),
    url(r'^update/(?P<pk>\d+)/?$', views.update_item, name='update_item'),

    # /items/<id>
    # detail view for a single item
    url(r'^(?P<pk>\d+)/?$', ItemDetailView.as_view(), name='item_detail'),
]
