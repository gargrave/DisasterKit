# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0003_auto_20150907_1722'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['order', 'name']},
        ),
        migrations.AlterModelOptions(
            name='subcategory',
            options={'ordering': ['order', 'name']},
        ),
        migrations.AddField(
            model_name='category',
            name='order',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='order',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
