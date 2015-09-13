from django.conf.urls import url

from . import views


urlpatterns = [
    # URL to create a new items
    # /items/api/create_item
    url(r'^api/create_item/?$', views.create_item, name='create_item'),

    # URL to fetch a list of all items details
    # /items/api/get_all_items
    url(r'^api/get_all_items/?$', views.get_all_items, name='get_all_items'),

    # URL to fetch details for a single items, as specified by ID
    # /items/api/get_item_by_id/<pk>
    url(r'^api/get_item_by_id/(?P<pk>\d+)/?$', views.get_item_by_id),

    # URL to POST an update to a single items
    # /items/api/update_item/
    url(r'^api/update_item/?$', views.update_item),

    # URL to delete a single items, as specified by ID
    # NOTE: this does not actually delete the record from the database, but
    #       rather just flags it as inactive, so it will be ignored when listing
    # /items/api/delete_item/<pk>
    url(r'^api/delete_item/(?P<pk>\d+)/?$', views.delete_item),

    # URL to fetch a list of all categories (i.e. for populating <select>s
    # /items/api/get_categories/
    url(r'^api/get_categories/?$', views.get_categories),
]
