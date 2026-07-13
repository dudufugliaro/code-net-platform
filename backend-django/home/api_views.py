from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Mensagem, User, Comentario, Reacao
from .serializers import MensagemSerializer, UserSerializer, ComentarioSerializer, ReacaoSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all().order_by('criado_em')
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]

class MensagemViewSet(viewsets.ModelViewSet):
    queryset = Mensagem.objects.all().order_by('-criada_em')
    serializer_class = MensagemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], url_path='reagir')
    def reagir(self, request, pk=None):
        """
        Alterna a reação do usuário logado neste post.
        Body: {"tipo": "curtida" | "aplauso" | "amei" | "ideia"}
        """
        mensagem = self.get_object()
        tipo = request.data.get('tipo')
        tipos_validos = dict(Reacao.TIPO_CHOICES)

        if tipo not in tipos_validos:
            return Response({'detail': 'Tipo de reação inválido.'}, status=400)

        reacao_existente = Reacao.objects.filter(mensagem=mensagem, usuario=request.user).first()

        if reacao_existente and reacao_existente.tipo == tipo:
            reacao_existente.delete()
        elif reacao_existente:
            reacao_existente.tipo = tipo
            reacao_existente.save()
        else:
            Reacao.objects.create(mensagem=mensagem, usuario=request.user, tipo=tipo)

        serializer = self.get_serializer(mensagem, context={'request': request})
        return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]