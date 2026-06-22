# Documentação da Arquitetura - CodeNet

## 1. Visão Geral
A arquitetura do **CodeNet** segue o modelo **Cliente-Servidor (Client-Server)** com separação clara entre o Front-end e o Back-end, comunicando-se através de uma **API REST**. Essa abordagem (frequentemente chamada de arquitetura desacoplada ou *headless*) permite escalabilidade, facilidade de manutenção e possibilita que o back-end seja consumido por diferentes clientes no futuro (como um aplicativo mobile).

---

## 2. Principais Componentes e Suas Funções

O sistema é dividido em três camadas principais:

* **Front-end (Cliente Web):**
    * **Função:** Responsável pela Interface do Usuário (UI) e Experiência do Usuário (UX). É onde o usuário interage com a plataforma (visualiza posts, faz login, cria conteúdo). Ele consome os dados da API e renderiza as páginas dinamicamente.
    * **Módulos principais:** Roteamento de páginas, gerenciamento de estado (sessão do usuário), formulários de autenticação e consumo da API REST.

* **Back-end (Servidor API):**
    * **Função:** Atua como o "cérebro" do sistema. Responsável pelas regras de negócio, autenticação, autorização, validação de dados e o processamento dos CRUDs (Usuários e Posts). Também expõe o painel administrativo.
    * **Módulos principais:** Endpoints da API REST, Middlewares de segurança (tokens de autenticação), rotas administrativas e comunicação com o banco de dados via ORM (Object-Relational Mapping).

* **Banco de Dados (Armazenamento):**
    * **Função:** Armazenamento persistente e seguro de todas as informações da aplicação, como credenciais de usuários, dados de perfil e conteúdo dos posts.

---

## 3. Comunicação entre os Componentes

O fluxo de comunicação ocorre da seguinte maneira:

1.  **O Front-end (Next.js/ReactJS)** envia requisições assíncronas utilizando o protocolo **HTTP/HTTPS** para o Back-end. Os dados trafegam estruturados no formato **JSON**.
2.  **O Back-end (Django / REST API)** recebe a requisição, valida os dados (por exemplo, verifica se o usuário tem permissão para criar um post) e utiliza o seu ORM interno para traduzir a ação em comandos SQL.
3.  **O Banco de Dados (SQLite)** recebe os comandos SQL, executa a operação de leitura ou escrita diretamente no arquivo de banco de dados e retorna os dados para o Back-end.
4.  O Back-end formata a resposta e a devolve em **JSON** para o Front-end, com os respectivos códigos de status HTTP (ex: `200 OK`, `201 Created`, `401 Unauthorized`). O Front-end então atualiza a interface para o usuário.

---

## 4. Diagrama de Arquitetura

O diagrama abaixo ilustra o fluxo de requisições e a estrutura dos módulos do CodeNet:

```mermaid
graph TD
    %% Entidades externas
    User((Usuário))

    %% Front-end
    subgraph "Front-end (Client)"
        Next[Next.js / ReactJS]
        UI[Interface HTML/CSS]
    end

    %% Back-end
    subgraph "Back-end (Server)"
        Django[Django REST Framework]
        Auth[Módulo de Autenticação]
        CRUD[Módulos CRUD - Usuários/Posts]
        Admin[Painel Administrativo]
    end

    %% Banco de Dados
    subgraph "Data Tier"
        DB[(SQLite)]
    end

    %% Relações
    User <-->|Navegação e Interação| UI
    UI <--> Next
    Next <-->|Requisições HTTP/JSON| Django
    Django <--> Auth
    Django <--> CRUD
    Django <--> Admin
    Auth <-->|ORM / SQL| DB
    CRUD <-->|ORM / SQL| DB
    Admin <-->|ORM / SQL| DB

## 5. Tecnologias e Ferramentas Utilizadas

Para atender aos requisitos do MVP, a stack tecnológica escolhida foi:

* **Front-end:**
    * **Linguagens:** HTML, CSS, JavaScript/TypeScript.
    * **Frameworks/Bibliotecas:** ReactJS e Next.js (para SSR/SSG e roteamento eficiente).

* **Back-end:**
    * **Linguagem:** Python.
    * **Framework:** Django (e Django REST Framework para criação da API REST).

* **Banco de Dados:**
    * **SGBD:** SQLite (banco de dados relacional leve, integrado e baseado em arquivo, ideal para simplificar o ambiente de desenvolvimento e a validação do MVP).

* **Ferramentas de Desenvolvimento e Gestão:**
    * **Versionamento de Código:** Git.
    * **Hospedagem de Repositório:** GitHub.
    * **Gerenciamento Ágil:** Kanban (GitHub Projects).
    * **Infraestrutura (Futura):** Docker (para conteinerização e padronização de ambientes).