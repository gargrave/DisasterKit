from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import items.views

urlpatterns = patterns(
    '',
    # default/empty url goes to index
    url(r'^', include('items.urls')),
    # admin site URL
    url(r'^admin/', include(admin.site.urls)),
)
