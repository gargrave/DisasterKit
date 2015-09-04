from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

from .models import StockItem


@login_required
def index(request):
    items = StockItem.objects.all()
    return render(request, 'items/index.html', {'items': items})


@login_required
def add_item(request):
    return render(request, 'items/add.html')
