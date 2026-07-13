from django.db import models

from django.contrib.auth.models import AbstractUser

from django.conf import settings

class Mensagem(models.Model):
    titulo = models.CharField(max_length=120)
    conteudo = models.TextField()
    autor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="mensagens", null=True)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criada_em"]

    def __str__(self):
        return self.titulo
    

class Comentario(models.Model):
    mensagem = models.ForeignKey(Mensagem, related_name="comentarios", on_delete=models.CASCADE)
    autor = models.CharField(max_length=80, default="Anônimo")
    conteudo = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["criado_em"]

    def __str__(self):
        return f"Comentário de {self.autor} em {self.mensagem.titulo}"


class User(AbstractUser):
    bio = models.TextField("Biografia", blank=True, null=True, help_text="Descreva um pouco sobre sua vida de desenvolvedor")
    email = models.EmailField("Endereço de Email", unique=True)
    birth_date = models.DateField(null=True, blank=True)