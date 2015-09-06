from django.conf.urls import url

from . import views
from .views import ItemDetailView, ItemUpdateView


urlpatterns = [
    # /items/
    # a list of all current items
    # url(r'^$', views.list_items, name='item_list'),

    # /items/add
    # 'add new item' page
    # url(r'^add/', views.add_item, name='add_item'),

    # /items/delete/<id>
    # deactivates an item, so it will not be listed anymore
    # url(r'^delete/(?P<pk>\d+)/?$', views.deactivate_item, name='deactivate_item'),

    # /items/<pk>
    # detail view for a single item
    # url(r'^(?P<pk>\d+)/?$', ItemDetailView.as_view(), name='item_detail'),

    # /items/update/<pk>
    # view for editing existing items
    # url(r'^update/(?P<pk>\d+)/?$', ItemUpdateView.as_view(), name='item_update'),

    # /items/api/get_all_items
    url(r'^api/get_all_items/?$', views.get_all_items, name='get_all_items'),
]
