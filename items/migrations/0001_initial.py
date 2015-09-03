# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='StockItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('count', models.IntegerField()),
                ('date_added', models.DateField(auto_now_add=True)),
                ('date_of_expiration', models.DateField()),
                ('added_by', models.CharField(max_length=64)),
                ('notes', models.TextField(blank=True, default='')),
                ('fk_category', models.ForeignKey(to='items.Category')),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.AddField(
            model_name='stockitem',
            name='fk_subcategory',
            field=models.ForeignKey(blank=True, to='items.SubCategory', null=True),
        ),
    ]
