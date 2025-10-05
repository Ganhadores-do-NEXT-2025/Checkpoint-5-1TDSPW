# Checkpoint 5 - 1TDSPW: Controle de Acesso com React

Repositório do projeto desenvolvido para o Checkpoint 5 da disciplina de *Front-end Engineering*.

**Link do Repositório:** https://github.com/Ganhadores-do-NEXT-2025/Checkpoint-5-1TDSPW

---

## 🎯 Objetivo do Projeto

O objetivo principal deste projeto é desenvolver uma aplicação front-end em React para controle de acesso de usuários. A aplicação implementa funcionalidades de **cadastro** e **login**, com validação de formulários e comunicação com uma API mock para simular a persistência e consulta de dados.

O projeto visa aplicar conceitos modernos de desenvolvimento front-end, como componentização, roteamento, gerenciamento de estado de formulários, validação de dados e integração com serviços externos.

---

## 🛠️ Ferramentas e Tecnologias

As seguintes ferramentas e tecnologias foram utilizadas na construção do projeto:

- **React:** Biblioteca principal para a construção da interface de usuário.
- **Vite:** Ferramenta de build para um ambiente de desenvolvimento rápido e otimizado.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código, aumentando a robustez e a manutenibilidade.
- **React Hook Form:** Gerenciamento de formulários de forma performática e com validações eficientes.
- **Zod:** Biblioteca de declaração e validação de esquemas de dados, utilizada em conjunto com o React Hook Form.
- **React Router DOM:** Para a implementação do sistema de rotas da aplicação (`/login` e `/cadastro`).
- **JSON Server:** Criação de uma API REST mock para simular o backend e persistir os dados dos usuários.
- **Axios:** Cliente HTTP para realizar as requisições à API do `json-server`.
- **Tailwind CSS:** Framework de CSS utility-first para a estilização dos componentes.

---

## 📋 Requisitos do Exercício

O projeto foi desenvolvido para atender aos seguintes requisitos:

1.  **Criação do Projeto e API Mock:**
    - Projeto criado com `VITE` + `React` + `TypeScript`.
    - Configuração do `json-server` com o endpoint `/usuarios` e os campos: `id`, `nome`, `nomeUsuario`, `email`.

2.  **Rota de Login:**
    - A rota `/login` (ou `/`) foi definida como a página inicial da aplicação.

3.  **Rota de Cadastro:**
    - A rota `/cadastro` foi criada e está acessível a partir de um link na página de login.

4.  **Formulário de Login:**
    - Formulário com os campos `nomeUsuario` e `email`.
    - Validação dos campos utilizando `React Hook Form` e `Zod`.

5.  **Formulário de Cadastro:**
    - Formulário com os campos `nome`, `nomeUsuario` e `email`.
    - Validação dos campos utilizando `React Hook Form` e `Zod`.

6.  **Mensagens de Erro:**
    - Implementação de mensagens de erro personalizadas e feedback visual para o usuário em ambos os formulários.

7.  **Lógica de Cadastro:**
    - Verificação de duplicidade de `nomeUsuario` e `email` no `json-server` antes de efetuar um novo cadastro.

8.  **Lógica de Login:**
    - Validação das credenciais do usuário consultando o endpoint `/usuarios`.
    - Simulação de autenticação e persistência da sessão utilizando `localStorage`.

9.  **Exibição de Dados do Usuário:**
    - Após o login, o nome e o email do usuário são exibidos em todas as páginas da aplicação.

10. **Versionamento:**
    - O projeto foi versionado com Git e GitHub, seguindo as boas práticas de commits semânticos (ex: `feat:`, `fix:`, `docs:`).

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Ganhadores-do-NEXT-2025/Checkpoint-5-1TDSPW.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd Checkpoint-5-1TDSPW/access-control-cp
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie a API com `json-server` (em um terminal):**
    ```bash
    npm run api
    ```

5.  **Inicie a aplicação React (em outro terminal):**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` e a API em `http://localhost:3001`.

---

## Documentação do JSON-Server (Mock de API)

O `json-server` é utilizado neste projeto para simular uma API REST de forma rápida e simples, permitindo o desenvolvimento do *frontend* sem depender de um *backend* completo. Ele atende às requisições de validação de duplicidade (`GET` por query param) e de cadastro (`POST`).

### 1\. Estrutura do Arquivo `db.json`

O arquivo **`db.json`** serve como o banco de dados do *mock* e armazena a coleção de usuários.

```json
{
  "usuarios": [
    {
      "id": 1,
      "nome": "Alice Silva",
      "nomeUsuario": "alicesilva",
      "email": "alice@exemplo.com"
    },
    {
      "id": 2,
      "nome": "Bruno Costa",
      "nomeUsuario": "brunocosta",
      "email": "bruno@exemplo.com"
    }
    // ... mais usuários
  ]
}
```

### 2\. Endpoints e Uso

O servidor é configurado para rodar na porta **3001**. O endpoint principal é o `usuarios`.

| Requisição | URL do Endpoint | Propósito no Projeto |
| :--- | :--- | :--- |
| **`GET`** | `http://localhost:3001/usuarios` | **Consulta Geral**: Retorna todos os usuários. |
| **`GET`** | `http://localhost:3001/usuarios?nomeUsuario=...` | **Validação de Unicidade**: Checa se um `nomeUsuario` já existe (usado no Zod). |
| **`GET`** | `http://localhost:3001/usuarios?email=...` | **Validação de Duplicidade**: Checa se um `email` já está em uso (usado no Zod). |
| **`POST`** | `http://localhost:3001/usuarios` | **Cadastro**: Recebe e salva o objeto do novo usuário. |

### 3\. Comandos de Execução no `package.json`

O comando para iniciar o servidor foi adicionado à seção `scripts` do `package.json`, garantindo que ele carregue o arquivo `db.json` e utilize a porta correta (`3001`).

```json
{
  "scripts": {
    // ... outros comandos
    "api": "json-server --watch db.json --port 3001" 
  }
}
```

---

# 🔒 Rota Protegida (PrivateRoute Component)

Este módulo define o componente `RotaProt`, que é responsável por proteger rotas específicas da aplicação, garantindo que apenas usuários **autenticados** possam acessá-las.

## ⚙️ Como Funciona

O componente `RotaProt` utiliza a lógica de autenticação baseada na presença de um token de acesso armazenado no `localStorage` do navegador.

### 1. Checagem de Autenticação (`isAuthenticated`)

A função principal é `isAuthenticated`, que verifica o status do login:

- Ela tenta recuperar o item `'userToken'` do `localStorage`.
- O valor é transformado em booleano (`!!token`):
    - Se o **token existir**, retorna `true` (usuário logado).
    - Se o **token for nulo ou vazio**, retorna `false` (usuário deslogado).

```typescript
const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('userToken');
    return !!token; 
};

---

# 📝 Rota Cadastro (User Registration Form)

Este módulo `Cadastro.tsx` é responsável por gerenciar toda a **lógica e interface do formulário de registro de novos usuários**. Ele implementa validações avançadas e comunicação assíncrona com a API para garantir a integridade dos dados.

---

## 🛠️ Como Funciona e Tecnologias Utilizadas

O componente combina várias bibliotecas líderes do ecossistema React/TypeScript:

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Hook Form** (`useForm`) | Gerencia o estado do formulário, registrando inputs (`register`) e manipulando o envio (`handleSubmit`). |
| **Zod** | Define o schema de validação dos dados de entrada de forma segura e tipada. |
| **Zod Resolver** | Integra o Zod ao React Hook Form, permitindo que a validação de schema seja executada automaticamente. |
| **Axios** | Cliente HTTP utilizado para fazer a requisição de cadastro (`POST`) para a API. |

### 1. Validação de Schema (Zod)

O objeto `cadastroAcessar` define as regras de validação para cada campo:

* **`nome`**: Mínimo de **3 caracteres**.
* **`nomeUsuario`**:
    * Mínimo de **4 caracteres**.
    * Usa uma **Expressão Regular (`.regex`)** para garantir que contenha **apenas letras e números** (`/^[a-zA-Z0-9]+$/`), proibindo espaços e caracteres especiais.
    * Usa **Validação Assíncrona (`.refine`)** para consultar a API (`http://localhost:3001/usuarios?nomeUsuario=...`) e checar se o nome de usuário já está em uso (unicidade).
* **`email`**:
    * Deve ser um **formato de e-mail válido** (`.email()`).
    * Usa **Validação Assíncrona (`.refine`)** para consultar a API (`http://localhost:3001/usuarios?email=...`) e checar se o e-mail já está registrado (duplicidade).

### 2. Fluxo de Envio (`onSubmit`)

A função `onSubmit` é executada apenas se **todas as validações do Zod passarem**.

1.  Os dados são limpos de mensagens de feedback anteriores.
2.  É feita uma requisição **`POST`** para `http://localhost:3001/usuarios` (API_URL) com os dados do formulário.
3.  **Sucesso (Status 201):** Uma mensagem de sucesso é exibida e o usuário é **redirecionado para a página de Login (`/`)** após 1.5 segundos.
4.  **Falha:** Se a requisição falhar (erro de conexão ou API), uma mensagem de erro (`errorMessage`) é exibida ao usuário.

### 3. Gerenciamento de Estado (React Hook Form)

O formulário aproveita os estados nativos fornecidos pelo `useForm`:

* **`{...register('campo')}`**: Conecta o input ao RHF, permitindo que ele gerencie o estado e dispare as validações.
* **`formState: { errors, isSubmitting }`**:
    * `errors`: Objeto que contém todas as mensagens de erro de validação (exibidas condicionalmente ao lado de cada campo).
    * `isSubmitting`: Estado booleano que fica `true` durante a execução da função `onSubmit` (a chamada `axios.post`), sendo usado para **desabilitar o botão** e mostrar o texto "Cadastrando...", evitando envios duplicados.

---

## 🚀 Implementação Detalhada

O código é estruturado como um componente funcional que encapsula todo o fluxo de formulário, desde a interface (JSX) até a lógica de negócios (Zod + Axios).

```typescript
// Imports e Definição da API_URL
import { useState } from 'react';
// ... outros imports

const API_URL = 'http://localhost:3001/usuarios';

// O Schema Zod garante a tipagem e as regras de validação.
const cadastroAcessar = z.object({ /* ... validações ... */ });

// ... Componente Cadastro e funções.

---

# 🔑 Rota Login (User Authentication Form)

O módulo `Login.tsx` implementa o formulário de acesso, responsável por **autenticar o usuário** usando suas credenciais (Nome de Usuário e E-mail) contra a base de dados simulada e, em caso de sucesso, iniciar a sessão.

---

## 🛠️ Como Funciona e Tecnologias Utilizadas

Este componente segue o mesmo padrão robusto do formulário de Cadastro, utilizando bibliotecas modernas para formulários e validação:

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Hook Form** (`useForm`) | Gerencia o estado e o ciclo de vida do formulário (registro de inputs, estado de envio). |
| **Zod** | Define o schema de validação para garantir que os campos obrigatórios e o formato do e-mail sejam respeitados. |
| **Zod Resolver** | Integração para que as regras de validação do Zod sejam aplicadas de forma automática pelo RHF. |
| **Axios** | Cliente HTTP para realizar a requisição de autenticação na API. |

### 1. Validação de Schema (Zod)

O schema `loginAcessar` define as regras mínimas necessárias antes de tentar a autenticação:

* **`nomeUsuario`**: Obrigatório (mínimo de 1 caractere).
* **`email`**: Obrigatório (mínimo de 1 caractere) e deve ter um formato de e-mail válido.

### 2. Fluxo de Autenticação (`onSubmit`)

A função `onSubmit` é a chave do processo de login. Ela lida com a comunicação com a API e o gerenciamento da sessão.

#### A. Requisição de Credenciais

1.  A função constrói uma URL de consulta (`GET`) que utiliza o **Nome de Usuário** e o **E-mail** fornecidos para buscar um registro exato na base de dados:
    ```typescript
    const login_url = `${API_URL}?nomeUsuario=${data.nomeUsuario}&email=${data.email}`;
    // Ex: http://localhost:3001/usuarios?nomeUsuario=testeuser&email=teste@email.com
    ```
    *Este método (GET com query params) é usado para simular a verificação de credenciais no JSON-Server.*

#### B. Processamento da Resposta

1.  **Sucesso (Credenciais Válidas):**
    * Se a API retorna **um ou mais resultados** (`response.data.length > 0`), o primeiro usuário encontrado é considerado autenticado.
    * O objeto do usuário (`user`) é salvo no **`localStorage`** (usando a chave `'user'`) para estabelecer a sessão.
    * O usuário é **redirecionado para a rota `/home`** após 1.5 segundos.
2.  **Falha (Credenciais Inválidas):**
    * Se a API retornar um array vazio (`response.data.length === 0`), indica que a combinação de Nome de Usuário e E-mail não foi encontrada. Uma mensagem de erro (`errorMessage`) é exibida.
3.  **Erro de Conexão:**
    * Qualquer falha na comunicação com a API (bloco `catch`) exibe uma mensagem de erro de conexão.

### 3. Experiência do Usuário (UX)

O componente aprimora a experiência de login ao:

* **Desabilitar o botão de envio** e alterar seu texto para "**Verificando Credenciais...**" enquanto a requisição `axios.get` está em andamento (`isSubmitting`).
* Exibir feedback visual claro (mensagens de sucesso ou erro) em caixas dedicadas.

---

Este componente, em conjunto com o `RotaProt` (Componente de Rota Protegida), forma um sistema funcional de autenticação e autorização de front-end.

---

# 🚀 Ponto de Entrada e Configuração de Rotas (main.tsx)

Este arquivo é o ponto de inicialização do seu aplicativo React. Ele configura o roteamento principal usando o `react-router-dom`, organizando as páginas em layouts e, mais crucialmente, aplicando **proteção de acesso** a rotas específicas.

## 🧭 Estrutura das Rotas com Rotas Aninhadas

A configuração utiliza o método **`createBrowserRouter`** para definir um array de rotas, que estão organizadas de forma hierárquica (aninhada), permitindo o uso eficiente de *layouts* compartilhados.

### 1\. Rota de Layout Principal

A rota raiz (`path: "/"`) utiliza o componente `<App />` como seu layout principal e define o `<Error />` para o tratamento centralizado de erros de navegação.

```typescript
{path: "/", element: <App/>, errorElement: <Error/>,
    children: [ 
        // ... Rotas Públicas e Protegidas
    ]
}
```

Todas as rotas filhas serão renderizadas dentro do `<Outlet />` presente no componente `<App />`.

### 2\. Rotas Públicas (Acesso Direto)

Essas rotas não exigem autenticação e ficam no primeiro nível de aninhamento.

  * `path: "/"`: Página de **Login** (`<Login />`).
  * `path: "/cadastro"`: Página de **Cadastro** (`<Cad />`).

-----

## 🔐 Implementação da Rota Protegida (`ProtectedRoute`)

A **`ProtectedRoute`** (importada como `RotaProt`) é utilizada como um **Layout Wrapper** para um subconjunto de rotas filhas, protegendo-as do acesso não autorizado.

### Como a RotaProt é Aplicada:

O bloco de proteção é um objeto de rota sem um `path` definido, mas com um `element` que aponta para o componente de proteção:

```typescript
{
    element: <ProtectedRoute/>, // <--- Aqui está o RotaProt
    children: [
        {path: "/home", element: <Home />},
        // [Adicione aqui qualquer outra rota que precise de login]
    ]
}
```

#### O Fluxo de Proteção:

1.  Quando o usuário tenta acessar uma rota filha (ex: `/home`), o `react-router-dom` renderiza primeiro o `element` pai: **`<ProtectedRoute />`**.
2.  Dentro de `ProtectedRoute`, a função `isAuthenticated()` é executada para checar a presença de um token no `localStorage`.
3.  **Se a autenticação for bem-sucedida** (`true`):
      * O `ProtectedRoute` renderiza o componente **`<Outlet />`**.
      * O `<Outlet />` exibe o componente filho correspondente (por exemplo, `<Home />`).
4.  **Se a autenticação falhar** (`false`):
      * O `ProtectedRoute` retorna um **`<Navigate to="/" replace />`**.
      * O usuário é **imediatamente redirecionado** para a página de Login (`/`), impedindo o acesso à rota protegida.

Essa estrutura garante que a lógica de autenticação seja aplicada de forma declarativa e centralizada, mantendo o código das rotas internas (`/home`) limpo e focado apenas na apresentação de dados.

---

## 👥 Integrantes do Grupo

- **Gustavo Tavares da Silva:** RM `562827`
- **João Victor Gomes de Souza 2:** RM `560907`
- **Lucas Barranha Giannini 3:** RM `564508`
- **Nome do Aluno 4:** RM `XXXXX`
