from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404

from .forms import ItemForm
from .models import StockItem, Category, SubCategory


@login_required
def index(request):
    """
    Provides the main site page.
    """
    items = StockItem.objects.all()
    return render(request, 'items/index.html', {'items': items})


@login_required
def list_items(request):
    """
    Provides a view which lists all current items.
    """
    items = StockItem.objects.all()
    return render(request, 'items/item_list.html', {'items': items})


@login_required
def add_item(request):
    """
    Provides a view to add a new item to the stock.
    """
    form = ItemForm(request.POST or None)
    if request.POST:
        # create/save a new StockItem, and redirect back to the list
        if form.is_valid():
            StockItem(
                name=request.POST['name'],
                count=request.POST['count'],
                date_of_expiration=request.POST['date_of_expiration'],
                added_by=str(request.user),
                fk_category=Category(pk=request.POST['fk_category']),
                fk_subcategory=SubCategory(pk=request.POST['fk_subcategory' or None]),
                notes=request.POST['notes' or '']
            ).save()
            return HttpResponseRedirect('/items/')
    # otherwise, render the entry form
    return render(request, 'items/add_item.html', {'form': form})
