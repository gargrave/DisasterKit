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
    'version': settings.VERSION,
    'build': settings.BUILD
}


@login_required
def index(request):
    """
    Provides the main site page.
    """
    return render(request, 'items/index.html', {
        'globalvars': globalvars,
        'fart': 'fart'
    })


################################################
# API Methods
################################################

@login_required
def create_item(request):
    """
    Adds a new StockItem to the database based on a POST request.
    """
    if request.POST:
        item = StockItem(
            name=request.POST.get('name'),
            count=int(request.POST.get('count')),
            date_of_expiration=request.POST.get('exp'),
            added_by=str(request.user),
            fk_category=Category.objects.get(name=request.POST.get('cat')),
            # fk_subcategory=SubCategory.objects.get(name=request.POST.get('subcat')),
            notes=request.POST.get('notes'),
        )
        # check for optional subcategory
        if request.POST.get('subcat'):
            item.fk_subcategory = SubCategory.objects.get(name=request.POST.get('subcat'))
        item.save()
        return HttpResponse(status=200)
    return HttpResponseRedirect('/')


@login_required
def get_all_items(request):
    """
    Returns a list of all active StockItems currently in the stock.
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
    Returns the StockItem that matches the specified ID.
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
def get_categories(request):
    """
    Returns a JSON object containg two lists:
        1. a list of all category names
        2. a list of all sub-category names
    """
    return JsonResponse({
        'cats': [cat.name for cat in Category.objects.all()],
        'subcats': [cat.name for cat in SubCategory.objects.all()]
    })


@login_required
def update_item(request):
    """
    Updates the specified items with the set of values passed in through POST.
    """
    if request.POST:
        item = get_object_or_404(StockItem, pk=request.POST['id'])
        item.name = request.POST['name']
        item.count = int(request.POST['count'])
        item.date_of_expiration = request.POST['exp']
        item.fk_category = Category.objects.get(name=request.POST['cat'])
        item.fk_subcategory = SubCategory.objects.get(name=request.POST['subcat'])
        item.notes = request.POST['notes']
        item.save()
    return HttpResponse(status=200)


@login_required
def delete_item(request, pk):
    """
    Deactivates the items with the specified ID. Note that this
    DOES NOT delete the items from the DB. It is simply a "soft
    deactivation" to prevent the items from being listed.
    """
    item = get_object_or_404(StockItem, pk=pk)
    item.active = False
    item.save()
    return HttpResponse(status=200)
