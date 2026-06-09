from django.db import models

# Create your models here.
from django.db import models

from django.contrib.auth.models import AbstractUser

class Mensagem(models.Model):
    titulo = models.CharField(max_length=120)
    conteudo = models.TextField()
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criada_em"]

    def __str__(self):
        return self.titulo
    

class User(AbstractUser):
    bio = models.TextField("Biografia", blank=True, null=True, help_text="Descreva um pouco sobre sua vida de desenvolvedor")
    email = models.EmailField("Endereço de Email", unique=True)
    birth_date = models.DateField(null=True, blank=True)