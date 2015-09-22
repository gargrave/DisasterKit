import os
import dj_database_url

from .base import *


SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = True
TEMPLATE_DEBUG = True
BUILD = 'staging'
EMAIL_INTERVAL = datetime.timedelta(minutes=1)

DATABASES = {'default': dj_database_url.config()}
