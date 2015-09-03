from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64, blank=False)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=64, blank=False)

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
    notes = models.TextField(blank=True, default='')

    def __str__(self):
        return self.name
