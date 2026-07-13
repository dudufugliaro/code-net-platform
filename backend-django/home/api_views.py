from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import Mensagem, User, Comentario
from .serializers import MensagemSerializer, UserSerializer, ComentarioSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed and created.
    """
    queryset = Comentario.objects.all().order_by('criado_em')
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]

class MensagemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed and created.
    """
    queryset = Mensagem.objects.all().order_by('-criada_em')
    serializer_class = MensagemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
