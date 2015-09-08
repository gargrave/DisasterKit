# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_stockitem_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(unique=True, max_length=64),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='name',
            field=models.CharField(unique=True, max_length=64),
        ),
    ]
