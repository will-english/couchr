# Generated by Django 4.0.3 on 2022-09-02 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('couchr_reviews', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='name',
            new_name='title',
        ),
    ]
