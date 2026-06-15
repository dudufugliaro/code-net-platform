from django.contrib import admin

from .models import Mensagem
# Register your models here.
from .models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(Mensagem)
class MensagemAdmin(admin.ModelAdmin):
    list_display = ("titulo", "criada_em")
    search_fields = ("titulo", "conteudo")

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Informações do Perfil de Desenvolvedor', {
            'fields': ('bio', 'birth_date'),
        }),
    )