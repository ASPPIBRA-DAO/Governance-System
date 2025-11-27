
# Arquitetura de Autenticação

Este documento detalha a arquitetura de autenticação da aplicação, que utiliza um frontend em React com um backend serverless (`worker-auth.js`) em Cloudflare Workers. A estratégia é baseada em JWT, com um `accessToken` de curta duração e um `refreshToken` de longa duração, persistido no banco de dados.

## Visão Geral do Fluxo

### 1. Cadastro (Sign Up)

-   **Frontend**: O usuário preenche o formulário de cadastro.
-   **Backend (`POST /auth/signup`)**: O worker normaliza o e-mail (`trim`, `lowercase`), verifica se o e-mail já existe no D1 para evitar duplicidade (`409 Conflict`), hasheia a senha com `bcrypt` e insere o novo usuário no banco de dados.

### 2. Login (Sign In)

-   **Frontend**: O usuário insere suas credenciais.
-   **Backend (`POST /auth/signin`)**: O worker normaliza o e-mail, busca o usuário no D1 e compara a senha enviada com o hash armazenado usando `bcrypt.compare()`.
-   **Geração de Tokens**: Se as credenciais forem válidas, o worker gera:
    -   Um `accessToken` (JWT assinado com `jose`, validade de 15 minutos) retornado no corpo.
    -   Um `refreshToken` (string segura e aleatória) cujo hash (`SHA-256`) é persistido na tabela `refresh_tokens` do D1 com validade de 30 dias.
-   **Cookie**: O `refreshToken` original é enviado ao cliente em um cookie `HttpOnly; Secure; Path=/; SameSite=Strict;`.

### 3. Refresh de Token

-   **Frontend**: Quando uma chamada à API falha com `401 Unauthorized`, um interceptor do `axios` envia o `refreshToken` (via cookie) para a rota de refresh.
-   **Backend (`POST /auth/refresh`)**:
    -   Lê o `refreshToken` do cookie.
    -   Gera um hash do token e verifica se ele existe e é válido na tabela `refresh_tokens`.
    -   Se válido, gera e retorna um novo `accessToken` de 15 minutos.

### 4. Redefinição de Senha (Ciclo Completo)

#### Etapa A: Solicitação de Redefinição

-   **Frontend**: O usuário insere seu e-mail.
-   **Backend (`POST /auth/request-password-reset`)**:
    -   O e-mail é normalizado. Somente se o usuário existir no D1, o fluxo prossegue internamente.
    -   Um token de redefinição seguro e de uso único é gerado. Seu hash `SHA-256` é armazenado na tabela `password_reset_tokens` com expiração de 30 minutos.
    -   Usando `ctx.waitUntil`, o worker dispara de forma assíncrona o envio do e-mail (via um serviço externo), contendo o link com o token original.
-   **Resposta Genérica**: Independentemente de o e-mail ter sido encontrado, o backend responde imediatamente com uma mensagem genérica para evitar enumeração de contas.

#### Etapa B: Definição da Nova Senha

-   **Frontend**: O usuário clica no link recebido e preenche o formulário com a nova senha.
-   **Backend (`POST /auth/reset-password`)**:
    -   Gera um hash `SHA-256` do token recebido.
    -   Verifica se o hash existe no D1 e não expirou.
    -   Hasheia a nova senha com `bcrypt` e atualiza o usuário.
    -   Exclui o token de redefinição da tabela para garantir o uso único.

### 5. Logout

-   **Frontend**: O `accessToken` é removido do `localStorage`.
-   **Backend (`POST /auth/logout`)**: **A ser implementado.** O `refreshToken` correspondente deve ser removido do banco de dados para invalidar a sessão por completo.
