import datetime
import os

import dj_database_url

from .base import *


# for dev builds, read the secret key from file
with open('etc/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
with open('etc/mailgun_key.txt') as f:
    MAILGUN_API_KEY = f.read().strip()
with open('etc/mailgun_url.txt') as f:
    MAILGUN_API_URL = f.read().strip()

DEBUG = True
TEMPLATE_DEBUG = True
BUILD = 'dev'
EMAIL_INTERVAL = datetime.timedelta(seconds=5)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dkit_local',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
