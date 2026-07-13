# CodeNet

## 📌 Ideia Geral do Projeto

O **CodeNet** é uma plataforma web voltada para a comunidade de tecnologia e programação, onde usuários poderão publicar conteúdos relacionados a desenvolvimento de software, tecnologia, boas práticas, estudos, experiências e tutoriais.

A proposta do projeto é oferecer um ambiente semelhante a plataformas como Medium e Hashnode, permitindo que desenvolvedores compartilhem conhecimento e interajam com outros usuários da comunidade tech.

---

## 💡 Descrição Geral do Sistema

O sistema será desenvolvido como uma aplicação web full stack e terá como foco inicial a implementação de um **Produto Mínimo Viável (MVP)**.

### Funcionalidades do MVP

- Visualização de posts publicados por usuários;
- Cadastro de usuários;
- Autenticação de usuários;
- CRUD de usuários;
- CRUD de posts;
- Painel administrativo para gerenciamento da plataforma.

### Funcionalidades Futuras (Desejáveis)

- Sistema de comentários em posts;
- Reações (curtidas, aplausos, etc.);
- Chat entre usuários;
- Sistema de tags/categorias;
- Perfil público de usuários;
- Feed personalizado;
- Sistema de seguidores.

---

## 👨‍💻 Tecnologias Utilizadas

### Front-end
- HTML
- CSS
- Next.js
- ReactJS

### Back-end
- Django
- API REST

### Banco de Dados
- SQLite

### Ferramentas
- Git e GitHub
- Kanban para gerenciamento ágil
- Docker (Ambiente de desenvolvimento Back-end)

---

## 🚀 Como Executar o Projeto Localmente

### Prerrequisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Docker e Docker Compose](https://www.docker.com/) (para o Back-end)
- [Node.js](https://nodejs.org/) e **npm** (para o Front-end)

### 1. Clonar o Repositório
```bash
# Clone este repositório
git clone [https://github.com/dudufugliaro/CodeNet.git](https://github.com/dudufugliaro/CodeNet.git)

# Acesse a pasta do projeto
cd CodeNet
```

### 2. Executar o Back-end (Django + Docker)
```bash
# Acesse a pasta do back-end
cd backend-django

# Suba o container com o Docker Compose
docker compose up --build
```
O servidor do back-end iniciará em: http://localhost:8000 <br>
O painel administrativo do Django estará disponível em: http://localhost:8000/admin

### 3. Executar o Front-end (Next.js)
Em um novo terminal, navegue até a pasta do front-end para instalar as dependências e rodar a aplicação.
```bash
# Acesse a pasta do front-end (ajuste o caminho se necessário)
cd frontend

# Instale as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
O servidor do front-end iniciará em: http://localhost:3000

## 👥 Integrantes da Equipe

- Caio Lucas 
- Camila Torres
- João Pedro Silva Bicalho
- Luiz Eduardo Fugliaro

---

## 📋 Quadro Kanban

Link do quadro Kanban:

[https://github.com/users/dudufugliaro/projects/2]

---

## 🚀 Objetivo do Projeto

O objetivo do projeto é aplicar conceitos de desenvolvimento web full stack, arquitetura de software, trabalho colaborativo e metodologias ágeis, desenvolvendo uma plataforma moderna e escalável para compartilhamento de conteúdo técnico.
