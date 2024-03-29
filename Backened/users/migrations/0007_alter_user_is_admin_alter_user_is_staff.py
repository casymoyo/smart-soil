# Generated by Django 4.2.6 on 2024-03-05 09:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0006_user_is_admin_alter_user_is_staff"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="is_admin",
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_staff",
            field=models.BooleanField(default=False, null=True),
        ),
    ]
