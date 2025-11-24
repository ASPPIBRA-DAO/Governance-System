const fs = require('fs');
const path = require('path');

// =========================================================
// 1. CONFIGURAÇÕES GERAIS
// =========================================================
const CONFIG = {
    // Usa variável de ambiente ou o padrão de produção
    domain: process.env.PUBLIC_URL || 'https://www.asppibra.com.br',
    appName: 'ASPPIBRA-DAO',
    appShortName: 'ASPPIBRA',
    appDescription: 'Sistema de Governança e Gestão da ASPPIBRA-DAO.',
    themeColor: '#1A73E8', 
    backgroundColor: '#ffffff',
    publicDir: path.join(__dirname, '../public'),
    workerDir: path.join(__dirname, '../d1-api-worker'),
    htmlPath: path.join(__dirname, '../public/index.html'),
    // ATENÇÃO: Apontando para o arquivo moderno JSONC
    workerConfigFile: 'wrangler.jsonc' 
};

// =========================================================
// 2. DEFINIÇÃO DE CONTEÚDO (Sitemap, Robots, Manifest)
// =========================================================

const publicPages = [
    { url: '/', priority: '1.0', freq: 'weekly' },
    { url: '/pages/pricing-page', priority: '0.8', freq: 'monthly' },
    { url: '/authentication/sign-in/illustration', priority: '0.6', freq: 'yearly' },
    { url: '/authentication/sign-up/cover', priority: '0.7', freq: 'yearly' },
    { url: '/authentication/reset-password/cover', priority: '0.4', freq: 'yearly' }
];

const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Allow: /pages/pricing-page
Allow: /authentication/sign-in/
Allow: /authentication/sign-up/

# ⛔ BLOQUEIOS DE SEGURANÇA
Disallow: /api/
Disallow: /server/
Disallow: /d1-api-worker/
Disallow: /dashboards/
Disallow: /admin/
Disallow: /pages/account/
Disallow: /pages/profile/
Disallow: /pages/users/
Disallow: /pages/projects/

# ⛔ BLOQUEIOS TÉCNICOS (Atualizado para JSONC)
Disallow: /.env
Disallow: /wrangler.toml
Disallow: /wrangler.jsonc
Disallow: /package.json
Disallow: /node_modules/

# 📍 SITEMAP
Sitemap: ${CONFIG.domain}/sitemap.xml
`;

const manifestContent = {
    name: CONFIG.appName,
    short_name: CONFIG.appShortName,
    description: CONFIG.appDescription,
    start_url: "/?source=pwa",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: CONFIG.themeColor,
    background_color: CONFIG.backgroundColor,
    scope: "/",
    icons: [
        { src: "/images/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
        { src: "/images/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ],
    categories: ["productivity", "finance", "business"]
};

// =========================================================
// 3. FUNÇÕES AUXILIARES
// =========================================================

function validateHTMLConsistency() {
    console.log('🔍 Validando consistência do index.html...');
    
    if (!fs.existsSync(CONFIG.htmlPath)) {
        console.error('❌ ERRO: index.html não encontrado!');
        return false;
    }

    const htmlContent = fs.readFileSync(CONFIG.htmlPath, 'utf-8');
    
    // Verifica se a Theme Color do HTML bate com a configuração
    const metaThemeRegex = /<meta name="theme-color" content="(.*?)" \/>/;
    const match = htmlContent.match(metaThemeRegex);

    if (match && match[1] !== CONFIG.themeColor) {
        console.warn(`⚠️  AVISO: Cor no HTML (${match[1]}) difere da Config (${CONFIG.themeColor}).`);
    } else {
        console.log('✅ index.html está sincronizado (Cor OK).');
    }
    return true;
}

// =========================================================
// 4. EXECUÇÃO
// =========================================================

console.log('🏗️  Iniciando Governança de Build...');

try {
    // 1. Robots.txt
    fs.writeFileSync(path.join(CONFIG.publicDir, 'robots.txt'), robotsContent);
    
    // 2. Sitemap.xml
    const today = new Date().toISOString().split('T')[0];
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages.map(page => `  <url>
    <loc>${CONFIG.domain}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    fs.writeFileSync(path.join(CONFIG.publicDir, 'sitemap.xml'), sitemapXML);

    // 3. Manifest
    fs.writeFileSync(path.join(CONFIG.publicDir, 'site.webmanifest'), JSON.stringify(manifestContent, null, 2));

    console.log('✅ Arquivos gerados com sucesso (SEO + PWA).');

} catch (error) {
    console.error('❌ ERRO CRÍTICO:', error);
    process.exit(1);
}

// =========================================================
// 5. AUDITORIA FINAL
// =========================================================

// Executa validação profunda
validateHTMLConsistency();

const filesToCheck = [
    // Agora verifica o arquivo CORRETO (jsonc)
    { path: path.join(CONFIG.workerDir, CONFIG.workerConfigFile), label: `Config Cloudflare (${CONFIG.workerConfigFile})` },
    { path: path.join(CONFIG.publicDir, 'images/android-chrome-192x192.png'), label: 'Ícone 192px' },
    { path: path.join(CONFIG.publicDir, 'images/dao.png'), label: 'Social Share Image' }
];

let hasError = false;
filesToCheck.forEach(file => {
    if (!fs.existsSync(file.path)) {
        console.error(`[FALHA ❌] Faltando: ${file.label}`);
        hasError = true;
    }
});

if (hasError) {
    console.error('\n⚠️  BUILD ABORTADO: Falha na integridade dos arquivos.');
    process.exit(1);
}

console.log('\n✨ SUCESSO TOTAL. Sistema pronto para deploy.');