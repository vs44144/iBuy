# Generated by Django 4.2.4 on 2024-03-06 10:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_rename_id_example_example_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShembulliPare',
            fields=[
                ('shembulliPareId', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('type', models.CharField(blank=True, max_length=50, null=True)),
                ('isDeleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='ShembulliDyte',
            fields=[
                ('shembulliDyteId', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('isDeleted', models.BooleanField(default=False)),
                ('shembulliPare', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shembulli_dyte', to='base.shembullipare')),
            ],
        ),
    ]