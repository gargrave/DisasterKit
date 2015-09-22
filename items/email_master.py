import requests

from django.conf import settings
from django.http import HttpResponse

from .emails.weekly_report import WeeklyReport
from .utils.timecheck import TimeCheck


def send_weekly_report(items):
    api_key = settings.MAILGUN_API_KEY
    url = settings.MAILGUN_API_URL

    if api_key == '' or url == '':
        return HttpResponse('The API key and/or URL is not set.')
    else:
        email = WeeklyReport(items)
        return requests.post(url, auth=('api', api_key), data={
            'from': email.from_field,
            'to': email.to_field,
            'subject': email.subject,
            'html': email.content
        })
