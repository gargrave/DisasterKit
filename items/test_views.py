from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase

from . import views


class ItemsViewsTests(TestCase):

    def setUp(self):
        # create and login as a temp/test user
        User.objects.create_user(username='temp', password='temp')
        login_successful = self.client.login(
            username='temp', password='temp')
        self.assertTrue(login_successful, 'User is not logged in.')

    def test_index(self):
        url = reverse('index')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        self.assertTemplateUsed('items/index.html')
        self.assertTrue(res.context['globalvars'])
        print(res.content)

    def test_create_item(self):
        pass
