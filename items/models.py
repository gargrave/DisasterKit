from django.core.urlresolvers import reverse
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64, blank=False, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=64, blank=False, unique=True)

    def __str__(self):
        return self.name


class StockItem(models.Model):
    name = models.CharField(max_length=128, blank=False)
    count = models.IntegerField(blank=False)
    date_added = models.DateField(auto_now_add=True)
    date_of_expiration = models.DateField(blank=False)
    added_by = models.CharField(max_length=64)
    fk_category = models.ForeignKey(Category, blank=False)
    fk_subcategory = models.ForeignKey(SubCategory, blank=True, null=True)
    notes = models.TextField(blank=True)
    # whether this instance should show up in the list
    # we will use this to hide it as a form of "soft delete"
    active = models.BooleanField(blank=True, default=True)

    def __str__(self):
        return self.name
