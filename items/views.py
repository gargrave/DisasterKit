from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

from .forms import ItemForm
from .models import StockItem


@login_required
def index(request):
    '''
    Provides the main site page.
    '''
    items = StockItem.objects.all()
    return render(request, 'items/index.html', {'items': items})


@login_required
def list_items(request):
    '''
    Provides a view which lists all current items.
    '''
    items = StockItem.objects.all()
    return render(request, 'items/item_list.html', {'items': items})


@login_required
def add_item(request):
    '''
    Provides a view to add a new item to the stock.
    '''
    form = ItemForm()
    return render(request, 'items/add_item.html', {'form': form})
