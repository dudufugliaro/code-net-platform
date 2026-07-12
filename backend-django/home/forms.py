# home/forms.py
from django import forms
from .models import User 
from django.contrib.auth.forms import UserCreationForm
INPUT = (
    "w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 "
    "text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
)


class UsuarioForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "bio", "birth_date"]
        labels = {
            "username": "Nome de Usuário",
            "first_name": "Nome",
            "last_name": "Sobrenome",
            "email": "E-mail",
            "bio": "Biografia",
            "birth_date": "Data de Nascimento",
        }
        widgets = {
            "username": forms.TextInput(attrs={"class": INPUT}),
            "first_name": forms.TextInput(attrs={"class": INPUT}),
            "last_name": forms.TextInput(attrs={"class": INPUT}),
            "email": forms.EmailInput(attrs={"class": INPUT}),
            "bio": forms.Textarea(attrs={"class": INPUT, "rows": 3}),
            "birth_date": forms.DateInput(attrs={"class": INPUT, "type": "date"}), 
        }
        def clean_email(self):
            email = self.cleaned_data.get('email')
            
            # Verifica se já existe alguém com este e-mail no banco
            if User.objects.filter(email=email).exists():
                raise forms.ValidationError("Este e-mail já está em uso. Por favor, escolha outro.")
                
            return email

class RegistroForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # Adiciona campos extras além do usuário e senha padrão
        fields = UserCreationForm.Meta.fields + ('email', 'first_name', 'last_name')
        
    # Esse bloco aplica as classes do Tailwind em todos os campos gerados
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if 'class' in field.widget.attrs:
                field.widget.attrs['class'] += f" {INPUT}"
            else:
                field.widget.attrs['class'] = INPUT