import requests

from django.conf import settings
from django.http import HttpResponse

from .emails import weekly_report
from .utils.timecheck import TimeCheck


def send_weekly_report():
    api_key = settings.MAILGUN_API_KEY
    url = settings.MAILGUN_API_URL

    if api_key == '' or url == '':
        return HttpResponse('The API key and/or URL is not set.')
    return requests.post(url, auth=('api', api_key), data={
        'from': weekly_report.from_field,
        'to': weekly_report.to_field,
        'subject': weekly_report.subject,
        'html': weekly_report.content
    })
