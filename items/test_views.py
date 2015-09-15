import json

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.db import models
from django.test import TestCase

from . import views
from .models import Category, StockItem, SubCategory


class ItemsViewsTests(TestCase):

    def setUp(self):
        # create and login as a temp/test user
        self.temp_user = User.objects.create_user(username='temp', password='temp')
        login_successful = self.client.login(username='temp', password='temp')
        self.assertTrue(login_successful, 'User is not logged in.')

        # create temp categories/sub-categories
        self.temp_cat = Category.objects.create(name='Food')
        self.temp_cat2 = Category.objects.create(name='Beverage')
        self.temp_subcat = SubCategory.objects.create(name='Sweet')
        self.temp_subcat2 = SubCategory.objects.create(name='Salty')

        # test POST data
        self.good_post_data = {
            'name': 'Name of item',
            'count': 1,
            'exp': '2015-12-25',
            'cat': self.temp_cat,
            'subcat': self.temp_subcat,
            'notes': 'These are notes.',
        }

        # create a new item and call the delete URL with its ID
        self.test_item = StockItem.objects.create(
            name='Test Item #1',
            count=12,
            date_of_expiration='2016-04-11',
            fk_category=Category.objects.get(name='Food'),
            fk_subcategory=SubCategory.objects.get(name='Salty'),
            notes=self.good_post_data['notes']
        )
        self.test_item2 = StockItem.objects.create(
            name='Test Item #2',
            count=5,
            date_of_expiration='2016-03-02',
            fk_category=Category.objects.get(name='Beverage'),
            fk_subcategory=SubCategory.objects.get(name='Sweet')
        )

    def test_index(self):
        """
        Tests the main home page.
        """
        url = reverse('index')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        self.assertTemplateUsed('items/index.html')
        self.assertTrue(res.context['globalvars'])

    def test_create_item_with_no_post(self):
        """
        Tests that the create_item URL redirects home when
        no POST data is received.
        """
        url = reverse('items:create_item')
        res = self.client.get(url)
        self.assertRedirects(res, '/')

    def test_create_item(self):
        """
        Tests that create_item URL correctly creates an item
        when good POST data is received.
        """
        url = reverse('items:create_item')
        res = self.client.post(url, self.good_post_data)
        self.assertEqual(res.status_code, 200)
        # make sure the item we create is in the database
        try:
            name = self.good_post_data['name']
            self.assertTrue(StockItem.objects.get(name=name))
        except StockItem.DoesNotExist:
            self.assertTrue(False, 'Expected item instance not found.')

    def test_get_all_items(self):
        """
        Tests that the get_all_items URL returns a list of items.
        """
        url = reverse('items:get_all_items')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        # make sure our test item is in the list
        json_items = json.loads(str(res.content, encoding='utf8'))['items']
        self.assertTrue(len(json_items) > 1)

    def test_get_item_by_id(self):
        """
        Tests that the get_item_by_id returns the correct item.
        """
        # attempt to select our original item
        item_id = self.test_item.id
        url = reverse('items:get_item_by_id', kwargs={'pk': item_id})
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        # make sure we get the item we expected
        json_item = json.loads(str(res.content, encoding='utf8'))
        item_name = json_item['name']
        self.assertEqual(item_name, self.test_item.name)

        # check that we get a 404 for a non-existent item
        url = reverse('items:get_item_by_id', kwargs={'pk': 8798798797})
        res = self.client.get(url)
        self.assertEqual(res.status_code, 404)

    def test_category(self):
        """
        Tests the category URL for GET/POST requests.
        """
        # test POST request to create a new category
        cat_name = 'New Category'
        url = reverse('items:category')
        res = self.client.post(url, {'name': cat_name})
        self.assertEqual(res.status_code, 200)
        # make sure the item we create is in the database
        cat = None
        try:
            cat = Category.objects.get(name=cat_name)
        except Category.DoesNotExist:
            pass
        self.assertNotEqual(cat, None, 'Category was not created correctly.')

        # send a malformed POST request and make sure we get a 400
        res = self.client.post(url, {'asdf': 'asdf'})
        self.assertEqual(res.status_code, 400)

        # attempt a GET request to make sure we get a list of categories
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        json_cats = json.loads(str(res.content, encoding='utf8'))
        self.assertTrue(len(json_cats) > 0)
        self.assertTrue(json_cats['cats'])
        self.assertTrue(json_cats['subcats'])

    def test_update_category(self):
        """
        Tests that the update_category URL properly updates the specified category.
        """
        new_cat = Category.objects.create(name='UpdateCategory')
        new_name = 'NewNameForUpdateCategory'
        url = reverse('items:update_category')
        res = self.client.post(url, {
            'id': new_cat.id,
            'name': new_name
        })
        self.assertEqual(res.status_code, 200)
        updated = Category.objects.get(pk=new_cat.id)
        self.assertEqual(updated.name, new_name)

    def test_delete_category(self):
        """
        Tests the delete_category API URL for properly deleting the
        specified Category.
        """
        cat_name = 'NewCategory'
        new_cat = Category.objects.create(name=cat_name)
        url = reverse('items:delete_category')
        res = self.client.post(url, {'pk': new_cat.id})
        self.assertEqual(res.status_code, 200)

        # make sure the Category we deleted is no longer present
        cat = None
        try:
            cat = Category.objects.get(name=cat_name)
        except Category.DoesNotExist:
            pass
        self.assertEqual(cat, None, 'Category was not deleted correctly.')

    def test_get_categories(self):
        """
        Tests the get_categories API URL for returning a list of all
        categories and sub-categories.
        """
        url = reverse('items:get_categories')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        # prase the response into cat/sub-cat lists and check expected values
        json_cats = json.loads(str(res.content, encoding='utf8'))['cats']
        json_subcats = json.loads(str(res.content, encoding='utf8'))['subcats']

        food = {'id': self.temp_cat.id, 'name': self.temp_cat.name}
        sweet = {'id': self.temp_subcat.id, 'name': self.temp_subcat.name}
        self.assertIn(food, json_cats)
        self.assertNotIn(sweet, json_cats)
        self.assertIn(sweet, json_subcats)
        self.assertNotIn(food, json_subcats)

    def test_update_item(self):
        """
        Tests the update_item view for correctly updating an item.
        """
        url = reverse('items:update_item')
        original_name = self.test_item.name
        update_data = self.good_post_data
        update_data['id'] = self.test_item.id
        update_data['name'] = 'Updated Test Item #1 Name'
        res = self.client.post(url, update_data)
        self.assertEqual(res.status_code, 200)
        self.assertIn(self.test_item, StockItem.objects.all())
        # confirm that that name has been updated
        updated_item = StockItem.objects.get(pk=self.test_item.id)
        self.assertEqual(update_data['name'], updated_item.name)
        self.assertNotEqual(original_name, updated_item.name)

    def test_delete_item(self):
        """
        Tests that the delete_item view correctly deletes and item
        from the database.
        """
        url = reverse('items:delete_item', kwargs={'pk': self.test_item.id})
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        # check that the item has its 'active' flag set to false
        updated_item = StockItem.objects.get(pk=self.test_item.id)
        self.assertFalse(updated_item.active)
