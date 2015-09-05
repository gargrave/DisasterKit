from django import forms

from .models import StockItem


class ModelFormSub(forms.ModelForm):

    def add_attr(self, field, attr, value):
        """Adds an attr to a form field"""
        self.fields[field].widget.attrs[attr] = value

    def add_attrs(self, field, attrs):
        """Adds an entire set of attrs based on the dict received """
        for k, v in attrs.items():
            self.add_attr(field, k, v)


class ItemForm(ModelFormSub):

    class Meta:
        model = StockItem
        fields = (
            'name', 'count', 'date_of_expiration',
            'fk_category', 'fk_subcategory', 'notes'
        )
        labels = {
            'name': 'Item name:',
            'count': 'Count:',
            'date_of_expiration': 'Expiration (YYYY-MM-DD):',
            'fk_category': 'Category:',
            'fk_subcategory': 'Sub-category:',
            'notes': 'Additional notes (optional):',
        }

    def __init__(self, *args, **kwargs):
        super(ItemForm, self).__init__(*args, **kwargs)
        self.add_attrs('name', {'class': 'u-full-width'})
        self.add_attrs('count', {'class': 'u-full-width'})
        self.add_attrs('date_of_expiration', {'class': 'u-full-width'})
        self.add_attrs('fk_category', {'class': 'u-full-width'})
        self.add_attrs('fk_subcategory', {'class': 'u-full-width'})
        self.add_attrs('notes', {'class': 'u-full-width'})
