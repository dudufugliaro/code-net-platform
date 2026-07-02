from rest_framework import serializers
from .models import Mensagem, User, Comentario

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'birth_date']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'mensagem', 'autor', 'conteudo', 'criado_em']

class MensagemSerializer(serializers.ModelSerializer):
    comentarios = ComentarioSerializer(many=True, read_only=True)
    
    class Meta:
        model = Mensagem
        fields = ['id', 'titulo', 'conteudo', 'autor', 'criada_em', 'comentarios']
