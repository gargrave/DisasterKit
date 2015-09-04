from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import items.views


urlpatterns = patterns(
    '',
    url(r'^items/', include('items.urls', namespace='items'), name='items'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {
        'next_page': '/'}),
    url(r'^admin/', include(admin.site.urls)),
)
