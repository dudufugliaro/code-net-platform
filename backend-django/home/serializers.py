from rest_framework import serializers
from .models import Mensagem, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'birth_date']

class MensagemSerializer(serializers.ModelSerializer):
    # Depending on how autor is handled, it might just be a charfield.
    # From models.py it is just models.CharField(max_length=80)
    class Meta:
        model = Mensagem
        fields = ['id', 'titulo', 'conteudo', 'autor', 'criada_em']
