from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Mensagem, User
from .serializers import MensagemSerializer, UserSerializer

class MensagemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows messages to be viewed.
    Using ReadOnlyModelViewSet as we only need to list and retrieve for now on the frontend.
    """
    queryset = Mensagem.objects.all().order_by('-criada_em')
    serializer_class = MensagemSerializer
    permission_classes = [AllowAny]

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
