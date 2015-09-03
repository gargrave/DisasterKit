from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import items.views

urlpatterns = patterns(
    '',
    url(r'^$', items.views.index, name='index'),
)
