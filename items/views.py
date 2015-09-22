from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.db.utils import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils.decorators import method_decorator

from .email_master import send_weekly_report
from .forms import ItemForm
from .models import StockItem, Category, SubCategory
from .utils.timecheck import TimeCheck

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


################################################
# Item URLs
################################################

@login_required
def item(request):
    # for GET requests, return a full list of StockItems
    if request.method == 'GET':
        items = StockItem.objects.filter(active=True)
        res_dict = {'items': []}
        for new_item in items:
            res_dict['items'].append({
                'id': new_item.id,
                'name': new_item.name,
                'count': new_item.count,
                'date_added': new_item.date_added,
                'exp': new_item.date_of_expiration,
                'added_by': new_item.added_by,
                'cat': str(new_item.fk_category),
                'subcat': str(new_item.fk_subcategory),
                'notes': new_item.notes
            })
        return JsonResponse(res_dict)
    # for POST request, attempt to create a new StockItem
    if request.method == 'POST':
        try:
            new_item = StockItem(
                name=request.POST.get('name'),
                count=int(request.POST.get('count')),
                date_of_expiration=request.POST.get('exp'),
                added_by=str(request.user),
                fk_category=Category.objects.get(name=request.POST.get('cat')),
                notes=request.POST.get('notes'),
            )
            # check for optional subcategory
            if request.POST.get('subcat'):
                new_item.fk_subcategory = SubCategory.objects.get(name=request.POST.get('subcat'))
            new_item.save()
            return HttpResponse(status=200)
        except IntegrityError:
            return HttpResponse(status=400)
    return HttpResponse(status=400)


@login_required
def item_update(request):
    """
    Updates the specified items with the set of values passed in through POST.
    """
    if request.method == 'POST':
        item_to_update = get_object_or_404(StockItem, pk=request.POST['id'])
        item_to_update.name = request.POST['name']
        item_to_update.count = int(request.POST['count'])
        item_to_update.date_of_expiration = request.POST['exp']
        item_to_update.fk_category = Category.objects.get(name=request.POST['cat'])
        item_to_update.fk_subcategory = SubCategory.objects.get(name=request.POST['subcat'])
        item_to_update.notes = request.POST['notes']
        item_to_update.save()
    return HttpResponse(status=200)


@login_required
def item_delete(request):
    """
    Deactivates the items with the specified ID. Note that this
    DOES NOT delete the items from the DB. It is simply a "soft
    deactivation" to prevent the items from being listed.
    """
    if request.method == 'POST':
        item_to_delete = get_object_or_404(StockItem, pk=request.POST['id'])
        item_to_delete.active = False
        item_to_delete.save()
    return HttpResponse(status=200)


#############################################
# Category URLs
#############################################

@login_required
def category(request):
    # for GET request, return a list of all categories/sub-categories
    if request.method == 'GET':
        return JsonResponse({
            'cats': [{'id': cat.id, 'name': cat.name} for cat in Category.objects.all()],
            'subcats': [{'id': cat.id, 'name': cat.name} for cat in SubCategory.objects.all()]
        })
    # for POST request, attempt to create a new category
    if request.method == 'POST':
        try:
            Category.objects.create(name=request.POST.get('name'))
            return HttpResponse(status=200)
        except IntegrityError:
            return HttpResponse(status=400)
    return HttpResponse(status=400)


@login_required
def category_update(request):
    if request.method == 'POST':
        cat = get_object_or_404(Category, pk=request.POST.get('id'))
        cat.name = request.POST.get('name')
        cat.save()
    return HttpResponse(status=200)


@login_required
def category_delete(request):
    """
    Delets the Category instance with the name specified in POST.
    """
    if request.POST:
        cat = get_object_or_404(Category, pk=request.POST.get('id'))
        cat.delete()
    return HttpResponse(status=200)


def weekly_report(request):
    """
    Sends a POST request to the server to have it generate and
    send a report to the registered email addresses.
    """
    if TimeCheck().is_ready():
        response = send_weekly_report()
        return HttpResponse(response.content)
    else:
        return HttpResponse('It is too soon to send another email.')
