from rest_framework import serializers
from .models import Mensagem, User, Comentario, Reacao

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'birth_date']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'mensagem', 'autor', 'conteudo', 'criado_em']

class ReacaoSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Reacao
        fields = ['id', 'mensagem', 'usuario', 'tipo', 'criada_em']
        read_only_fields = ['usuario']

class MensagemSerializer(serializers.ModelSerializer):
    comentarios = ComentarioSerializer(many=True, read_only=True)
    autor = UserSerializer(read_only=True)
    reacoes_resumo = serializers.SerializerMethodField()
    minha_reacao = serializers.SerializerMethodField()

    class Meta:
        model = Mensagem
        fields = ['id', 'titulo', 'conteudo', 'autor', 'criada_em', 'comentarios', 'reacoes_resumo', 'minha_reacao']

    def get_reacoes_resumo(self, obj):
        resumo = {tipo: 0 for tipo, _ in Reacao.TIPO_CHOICES}
        for reacao in obj.reacoes.all():
            resumo[reacao.tipo] = resumo.get(reacao.tipo, 0) + 1
        return resumo

    def get_minha_reacao(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None
        reacao = obj.reacoes.filter(usuario=request.user).first()
        return reacao.tipo if reacao else None
