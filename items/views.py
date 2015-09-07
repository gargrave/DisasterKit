from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils.decorators import method_decorator

from .forms import ItemForm
from .models import StockItem, Category, SubCategory


globalvars = {
    'is_debug': settings.DEBUG,
    'version': settings.VERSION
}


@login_required
def index(request):
    """
    Provides the main site page.
    """
    return render(request, 'items/index.html', {
        'globalvars': globalvars
    })


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
    page_vars = {
        'sixcols': 'six columns offset-by-three'
    }
    return render(request, 'items/add_item.html', {
        'form': form, 'globalvars': globalvars, 'page_vars': page_vars
    })


################################################
# API Methods
################################################

@login_required
def get_all_items(request):
    """
    Returns a list of all active items currently in the stock.
    """
    items = StockItem.objects.filter(active=True)
    res_dict = {'items': []}
    for item in items:
        res_dict['items'].append({
            'id': item.id,
            'name': item.name,
            'count': item.count,
            'date_added': item.date_added,
            'exp': item.date_of_expiration,
            'added_by': item.added_by,
            'cat': str(item.fk_category),
            'subcat': str(item.fk_subcategory),
            'notes': item.notes
        })
    return JsonResponse(res_dict)


@login_required
def get_item_by_id(request, pk):
    """
    Returns the item that matches the specified ID.
    """
    item = get_object_or_404(StockItem, pk=pk)
    res_dict = {
        'id': item.id,
        'name': item.name,
        'count': item.count,
        'date_added': item.date_added,
        'exp': item.date_of_expiration,
        'added_by': item.added_by,
        'cat': str(item.fk_category),
        'subcat': str(item.fk_subcategory),
        'notes': item.notes
    }
    return JsonResponse(res_dict)


@login_required
def update_item(request):
    print('**************************')
    print('* update_item')
    print(request.method)
    if request.POST:
        print(request.POST)
        item = get_object_or_404(StockItem, pk=request.POST['id'])
        item.name = request.POST['name']
        item.count = int(request.POST['count'])
        item.date_of_expiration = request.POST['exp']
        # item.fk_category = request.POST['cat']
        # item.fk_subcategory = request.POST['subcat']
        item.notes = request.POST['notes']
        item.save()
    return HttpResponse(status=200)


@login_required
def delete_item(request, pk):
    """
    Deactivates the item with the specified ID. Note that this
    DOES NOT delete the item from the DB. It is simply a "soft
    deactivation" to prevent the item from being listed.
    """
    item = get_object_or_404(StockItem, pk=pk)
    item.active = False
    item.save()
    return HttpResponse(status=200)
