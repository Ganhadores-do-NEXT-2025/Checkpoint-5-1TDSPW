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

-----

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

## 👥 Integrantes do Grupo

- **Gustavo Tavares da Silva:** RM `562827`
- **João Victor Gomes de Souza 2:** RM `560907`
- **Lucas Barranha Giannini 3:** RM `564508`
- **Nome do Aluno 4:** RM `XXXXX`
