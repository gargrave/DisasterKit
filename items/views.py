from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import StockItem


# Create your views here.
def index(request):
    items = StockItem.objects.all()
    return render(request, 'items/index.html', {'items': items})
