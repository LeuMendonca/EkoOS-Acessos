# Generated by Django 3.2 on 2023-06-15 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Acesso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('empresa', models.CharField(max_length=50)),
                ('maquina', models.CharField(max_length=50)),
                ('team_viewer', models.CharField(max_length=20)),
                ('senha_team_viewer', models.CharField(max_length=20)),
                ('anydesk', models.CharField(max_length=20)),
                ('senha_anydesk', models.CharField(max_length=20)),
                ('rustdesk', models.CharField(max_length=20)),
                ('senha_rustdesk', models.CharField(max_length=20)),
                ('mstc', models.CharField(max_length=20)),
                ('senha_mstc', models.CharField(max_length=20)),
                ('observacao', models.TextField()),
            ],
        ),
    ]
