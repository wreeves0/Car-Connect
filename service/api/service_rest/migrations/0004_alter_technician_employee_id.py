# Generated by Django 4.0.3 on 2024-02-07 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_automobilevo_import_href'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_id',
            field=models.PositiveSmallIntegerField(unique=True),
        ),
    ]