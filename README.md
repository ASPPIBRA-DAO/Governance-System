![version](https://img.shields.io/badge/version-1.0.1-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/ct-material-dashboard-pro-react.svg)](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/ct-material-dashboard-pro-react.svg)](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues?q=is%3Aissue+is%3Aclosed)

**Documentation built by Developers**

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump-start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

View [example pages here](https://demos.creative-tim.com/material-dashboard-2-pro-react-ts/#/dashboards/analytics).

## Configuração do Ambiente e Variáveis

Para que a aplicação funcione corretamente, seja em ambiente de desenvolvimento local ou em produção, é crucial configurar as variáveis de ambiente necessárias. Essas variáveis contêm chaves de API, endpoints de serviços e outras informações sensíveis ou de configuração que não devem estar fixas no código-fonte.

A configuração é gerenciada através da interface do Cloudflare Pages, na seção "Configurações" > "Variáveis e segredos".

### Integrações de Back-end

A aplicação possui duas integrações principais de back-end que precisam ser configuradas:

1.  **Banco de Dados (Cloudflare D1)**: A conexão com o banco de dados principal.
2.  **Armazenamento de Objetos (Cloudflare R2)**: Usado para armazenar e servir imagens e outros ativos estáticos.

### Variáveis de Ambiente Necessárias

Abaixo está a lista completa de todas as variáveis de ambiente que devem ser configuradas no ambiente do Cloudflare Pages. É altamente recomendado que todas as chaves e segredos sejam cadastrados com o tipo **`Segredo`** para maior segurança.

#### Variáveis da API e Aplicação

Estas variáveis são usadas pelo front-end para se comunicar com o back-end e para configurações gerais da aplicação.

- `APIServer`
  - **Descrição**: A URL base do servidor da API para onde o front-end envia as requisições.
  - **Exemplo**: `http://201.48.119.97:10112/api`
- `AUTHID`
  - **Descrição**: Um ID de autenticação utilizado nas requisições para identificar a aplicação cliente.
  - **Exemplo**: `001337BDCAF1CC5F`

#### Variáveis do Cloudflare R2 (Armazenamento de Imagens)

Estas variáveis são usadas pelo servidor (`server/r2.js`) para se autenticar e interagir com o bucket de armazenamento R2.

- `R2_BUCKET_NAME`
  - **Descrição**: O nome exato do bucket criado no Cloudflare R2.
  - **Exemplo**: `governance-system-assetes`
- `R2_ENDPOINT`
  - **Descrição**: O endpoint público do seu bucket R2, fornecido pela Cloudflare.
  - **Exemplo**: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
- `R2_ACCESS_KEY_ID`
  - **Descrição**: O Access Key ID para acessar o R2. Deve ser criado nas configurações do R2.
  - **Tipo recomendado**: `Segredo`
- `R2_SECRET_ACCESS_KEY`
  - **Descrição**: O Secret Access Key correspondente ao Access Key ID.
  - **Tipo recomendado**: `Segredo`

### Integração com Banco de Dados D1

A conexão com o banco de dados D1 é configurada de forma diferente, através de um **binding**, e não por variáveis de ambiente tradicionais.

A configuração está no arquivo `d1-api-worker/wrangler.jsonc`:

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

- **`binding`: "DB"**: Este é o "apelido" que o código do worker usa para se referir ao banco de dados. A plataforma Cloudflare injeta automaticamente a conexão no worker com este nome. Não é necessário cadastrar isso como uma variável de ambiente.

---

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.

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
