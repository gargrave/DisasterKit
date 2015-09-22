import datetime
import os

import dj_database_url

from .base import *


SECRET_KEY = os.environ['SECRET_KEY']
MAILGUN_API_KEY = os.environ['MAILGUN_API_KEY']
MAILGUN_API_URL = os.environ['MAILGUN_API_URL']

DEBUG = True
TEMPLATE_DEBUG = True
BUILD = 'staging'
EMAIL_INTERVAL = datetime.timedelta(minutes=1)

DATABASES = {'default': dj_database_url.config()}
