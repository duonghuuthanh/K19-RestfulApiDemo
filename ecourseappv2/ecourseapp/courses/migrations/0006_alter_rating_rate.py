# Generated by Django 4.1.7 on 2023-03-15 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_rating_like'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='rate',
            field=models.SmallIntegerField(default=0),
        ),
    ]
