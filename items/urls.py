from django.conf.urls import url

from . import views


urlpatterns = [
    # URL to fetch details for a single items, as specified by ID
    # /items/api/get_item_by_id/<pk>
    url(r'^api/get_item_by_id/(?P<pk>\d+)/?$',
        views.get_item_by_id, name='get_item_by_id'),

    #############################################
    # Item URLs
    #############################################

    # URL to GET or POST items
    # /items/api/item/
    # GET request returns a full list of StockItems
    # POST request will attempt to create a new StockItem
    url(r'^api/item/?$',
        views.item, name='item'),

    # URL to update a item via POST submission
    # items/api/item/update/
    url(r'^api/item/update/?$',
        views.item_update, name='item_update'),

    # URL to delete a item via POST submission
    # items/api/item/delete/
    url(r'^api/item/delete/?$',
        views.item_delete, name='item_delete'),

    #############################################
    # Category URLs
    #############################################

    # URL to GET or POST categories
    # /items/api/category/
    # GET request returns a full list of cats/sub-cats
    # POST request will attempt to create a new category
    url(r'^api/category/?$',
        views.category, name='category'),

    # URL to update a category via POST submission
    # items/api/category/update/
    url(r'^api/category/update/?$',
        views.category_update, name='category_update'),

    # URL to delete a category via POST submission
    # items/api/category/delete/
    url(r'^api/category/delete/?$',
        views.category_delete, name='category_delete'),
]
