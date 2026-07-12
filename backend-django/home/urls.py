from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('perfil/', views.editar_perfil, name='perfil_usuario'),
    path('comunidade/', views.listar_usuarios, name='listar_usuarios'),
    path('cadastrar/', views.cadastrar_usuario, name='cadastrar'),
    path('perfil/excluir/', views.excluir_conta, name='excluir_conta'),
    path('login/', auth_views.LoginView.as_view(template_name='home/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('api/mensagens/', views.api_mensagens, name='api_mensagens'),
]