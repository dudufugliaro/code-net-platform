from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import Mensagem, User
from django.contrib.auth import login,logout
from .forms import UsuarioForm,RegistroForm

def index(request):
    mensagens = Mensagem.objects.all()
    return render(request, "home/index.html", {"mensagens": mensagens})

@login_required
def editar_perfil(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('perfil_usuario') 
    else:
        form = UsuarioForm(instance=request.user)

    return render(request, 'home/form_usuario.html', {'form': form})

def listar_usuarios(request):
    usuarios = User.objects.all()
    return render(request, 'home/listar_usuarios.html', {'usuarios': usuarios})

def cadastrar_usuario(request):
    # Se o usuário já estiver logado, não faz sentido ele acessar a tela de cadastro
    if request.user.is_authenticated:
        return redirect('listar_usuarios')

    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            # Salva o usuário no banco (a senha já vai criptografada)
            user = form.save()
            # Faz o login automático do novo usuário
            login(request, user)
            # Redireciona para a página de perfil para ele terminar de preencher a bio
            return redirect('perfil_usuario') 
    else:
        form = RegistroForm()
        
    return render(request, 'home/cadastro.html', {'form': form})
@login_required
def excluir_conta(request):
    if request.method == 'POST':
        # Pega o usuário logado
        usuario = request.user
        # Apaga do banco de dados
        usuario.delete()
        # Redireciona para a tela de cadastro (já que ele não tem mais conta)
        return redirect('cadastrar') 
    
    # Se for apenas um acesso comum (GET), mostra a tela pedindo confirmação
    return render(request, 'home/excluir_conta.html')