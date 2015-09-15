from django.conf.urls import url

from . import views


urlpatterns = [
    # URL to create a new items
    # /items/api/create_item
    url(r'^api/create_item/?$',
        views.create_item, name='create_item'),

    # URL to fetch a list of all items details
    # /items/api/get_all_items
    url(r'^api/get_all_items/?$',
        views.get_all_items, name='get_all_items'),

    # URL to fetch details for a single items, as specified by ID
    # /items/api/get_item_by_id/<pk>
    url(r'^api/get_item_by_id/(?P<pk>\d+)/?$',
        views.get_item_by_id, name='get_item_by_id'),

    # URL to POST an update to a single items
    # /items/api/update_item/
    url(r'^api/update_item/?$',
        views.update_item, name='update_item'),

    # URL to delete a single items, as specified by ID
    # NOTE: this does not actually delete the record from the database, but
    #       rather just flags it as inactive, so it will be ignored when listing
    # /items/api/delete_item/<pk>
    url(r'^api/delete_item/(?P<pk>\d+)/?$',
        views.delete_item, name='delete_item'),

    #############################################
    # Item URLs
    #############################################

    # URL to GET or POST items
    # /items/api/item/
    # GET request returns a full list of StockItems
    # POST request will attempt to create a new StockItem
    url(r'^api/item/?$',
        views.item, name='item'),

    #############################################
    # Category URLs
    #############################################

    # URL to GET or POST categories
    # /items/api/category/
    # GET request returns a full list of cats/sub-cats
    # POST request will attempt to create a new category
    url(r'^api/category/?$',
        views.category, name='category'),

    # URL to delete a category via POST submission
    # items/api/category/delete/
    url(r'^api/category/delete/?$',
        views.delete_category, name='delete_category'),

    # URL to update a category via POST submission
    # items/api/category/update/
    url(r'^api/category/update/?$',
        views.update_category, name='update_category'),
]
