import os
import dj_database_url

from .base import *


SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = False
TEMPLATE_DEBUG = False
BUILD = 'prod'
EMAIL_INTERVAL = datetime.timedelta(days=1)

DATABASES = {'default': dj_database_url.config()}
