![version](https://img.shields.io/badge/version-1.0.1-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/ct-material-dashboard-pro-react.svg)](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/ct-material-dashboard-pro-react.svg)](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues?q=is%3Aissue+is%3Aclosed)

**Documentation built by Developers**

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump-start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

View [example pages here](https://demos.creative-tim.com/material-dashboard-2-pro-react-ts/#/dashboards/analytics).

---

## 🚀 Guia de Setup e Execução

Esta seção descreve como configurar e executar a aplicação, tanto em um ambiente de desenvolvimento local quanto em produção.

### 1. Pré-requisitos

- **Node.js**: Versão LTS. Baixe em [nodejs.org](https://nodejs.org/en/download/).
- **Yarn ou npm**: Gerenciador de pacotes.
- **Conta na Cloudflare**: Com acesso aos serviços R2 (armazenamento) e D1 (banco de dados).

### 2. Instalação

Navegue até a raiz do projeto e instale as dependências do front-end e do back-end:

```bash
# Instala as dependências do front-end (React)
npm install

# Navega para o diretório do servidor e instala suas dependências
cd server
npm install
cd ..
```

### 3. Configuração do Ambiente

A aplicação necessita de variáveis de ambiente para se conectar aos serviços da Cloudflare.

#### Desenvolvimento Local

Para o desenvolvimento local, crie um arquivo chamado `.env` dentro da pasta `server/`. Este arquivo conterá as chaves de acesso para o Cloudflare R2.

1.  **Crie o arquivo:** `touch server/.env`
2.  **Adicione o seguinte conteúdo ao arquivo `server/.env`**, substituindo os valores pelos seus dados do Cloudflare R2:

```env
# Cloudflare R2 - Credenciais e Configurações
# Obtenha estes valores no seu painel da Cloudflare R2

# O ID da chave de acesso do seu token da API R2
R2_ACCESS_KEY_ID=SEU_ACCESS_KEY_ID

# A chave de acesso secreta do seu token da API R2
R2_SECRET_ACCESS_KEY=SUA_SECRET_ACCESS_KEY

# O nome exato do seu bucket no R2
R2_BUCKET_NAME=governance-system-assets

# O endpoint do S3 API do seu bucket (Encontrado nas configurações do bucket R2)
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# A URL pública do seu bucket (Encontrado nas configurações do bucket R2)
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

#### Ambiente de Produção (Cloudflare Pages)

Em produção, as variáveis devem ser configuradas na interface do Cloudflare Pages:
- Vá para **Configurações > Variáveis e segredos**.
- Adicione as mesmas variáveis do `.env` (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, etc.).
- É **altamente recomendado** que as chaves de acesso (`R2_ACCESS_KEY_ID` e `R2_SECRET_ACCESS_KEY`) sejam cadastradas com o tipo **`Segredo`**.

### 4. Migração de Ativos (Imagens)

Antes de iniciar a aplicação pela primeira vez, você precisa enviar as imagens locais para o seu bucket no Cloudflare R2. O projeto inclui um script para automatizar isso.

**Execute o comando de migração a partir da raiz do projeto:**

```bash
cd server && npm run migrate
```
Este comando lerá as imagens da pasta `src/assets/images` e fará o upload para o bucket R2 configurado no seu arquivo `.env`. **Este passo só precisa ser executado uma vez.**

### 5. Executando a Aplicação

Com tudo configurado, você pode iniciar os servidores de desenvolvimento:

```bash
# Para iniciar o servidor do back-end (API)
# Em um terminal, navegue até a pasta 'server' e inicie
cd server
npm start

# Para iniciar o servidor do front-end (React)
# Em OUTRO terminal, a partir da raiz do projeto
npm start
```

O front-end estará disponível em `http://localhost:3000` e o back-end em `http://localhost:8787` (ou na porta definida).

---

## Integração com Banco de Dados D1

A conexão com o banco de dados D1 é configurada através de um **binding** no arquivo `d1-api-worker/wrangler.jsonc`. A plataforma Cloudflare injeta a conexão automaticamente no worker, não sendo necessário cadastrar credenciais em variáveis de ambiente.

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "governance-system-db",
      "database_id": "fbdff5ac-2fcc-4182-9cbf-be6c1d08e287"
    }
  ]
}
```

## Documentation

The documentation for the Material Dashboard is hosted at our [website](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdpr).

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-2-pro-react-ts
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   ├── theme
    │   │   │   ├── base
    │   │   │   ├── components
    │   │   │   ├── functions
    │   │   │   ├── index.ts
    │   │   │   └── theme-rtl.ts
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.ts
    │   │       └── theme-rtl.ts
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBadgeDot
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDDatePicker
    │   │   ├── MDDropzone
    │   │   ├── MDEditor
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   ├── MDSocialButton
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Calendar
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── applications
    │   │   │   ├── calendar
    │   │   │   ├── data-tables
    │   │   │   ├── kanban
    │   │   │   └── wizard
    │   │   ├── authentication
    │   │   │   ├── components
    │   │   │   ├── reset-password
    │   │   │   ├── sign-in
    │   │   │   └── sign-up
    │   │   ├── dashboards
    │   │   │   ├── analytics
    │   │   │   └── sales
    │   │   ├── ecommerce
    │   │   │   ├── orders
    │   │   │   └── products
    │   │   └── pages
    │   │       ├── account
    │   │       ├── charts
    │   │       ├── notifications
    │   │       ├── pricing-page
    │   │       ├── profile
    │   │       ├── projects
    │   │       ├── rtl
    │   │       ├── users
    │   │       └── widgets
    │   ├── types
    │   ├── App.tsx
    │   ├── index.tsx
    │   ├── page.routes.tsx
    │   └── routes.tsx
    ├── .eslintignore
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- [Live Preview](https://demos.creative-tim.com/material-dashboard-2-pro-react-ts/#/dashboards/analytics?ref=readme-mdpr)
- [Buy Page](https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts?ref=readme-mdpr)
- Documentation is [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdpr)
- [License Agreement](https://www.creative-tim.com/license?ref=readme-mdpr)
- [Support](https://www.creative-tim.com/contact-us?ref=readme-mdpr)
- Issues: [Github Issues Page](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues)

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Material Dashboard 2 PRO React. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Material Dashboard 2 PRO React. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts?ref=readme-mdpr).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us?ref=readme-mdpr) instead of opening an issue.
