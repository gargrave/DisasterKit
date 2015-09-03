import os
import dj_database_url

from .base import *


DEBUG = False
TEMPLATE_DEBUG = False

DATABASES = {'default': dj_database_url.config()}
