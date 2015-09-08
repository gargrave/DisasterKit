from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import items.views


urlpatterns = patterns(
    '',
    # index URL; main page
    url(r'^$', items.views.index, name='index'),

    # items app
    url(r'^items/', include('items.urls', namespace='items'), name='items'),

    # login/logout
    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),

    # admin section
    url(r'^admin/', include(admin.site.urls), name='admin'),
)
