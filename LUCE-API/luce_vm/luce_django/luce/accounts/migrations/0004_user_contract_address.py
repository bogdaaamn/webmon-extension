# Generated by Django 2.2 on 2021-04-29 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_remove_user_contract_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='contract_address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
