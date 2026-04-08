# LION SOCKS - Brand Kit
## Guia de Ficheiros

### 01_logo_principal/
Logo completo (escudo + texto) em várias resoluções.
- `logo_completo_transparente_full.png` — Resolução máxima, fundo transparente
- `logo_completo_transparente_1000h.png` — 1000px altura, fundo transparente
- `logo_completo_transparente_500h.png` — 500px altura, fundo transparente
- `logo_completo_fundo_preto_1000h.jpg` — Fundo preto, para impressão
- `logo_completo_fundo_branco_full.jpg` — Fundo branco, para documentos

### 02_logo_header/
Logo otimizado para cabeçalhos de websites.
- `header_200w.png` — 200px largura (header pequeno)
- `header_300w.png` — 300px largura (recomendado para Shopify)
- `header_450w.png` — 450px largura (header grande)
- `header_600w.png` — 600px largura (retina/alta resolução)
**SHOPIFY:** Usa `header_300w.png` no cabeçalho do tema.

### 03_icone_escudo/
Só o escudo do leão sem texto. Ideal para bordados e ícones.
- Tamanhos: 128, 256, 512, 1024px (quadrados)
- Versão fundo preto incluída

### 04_favicon/
Ícones para browser e dispositivos.
- `favicon_32x32.png` — Favicon padrão
- `favicon_192x192.png` — Android Chrome
- `apple_touch_icon_180x180.png` — iPhone/iPad
- `favicon_512x512.png` — PWA / alta resolução
**SHOPIFY:** Usa `favicon_32x32.png` em Settings > Brand > Favicon

### 05_hero_banner/
Banners de abertura do site com textura premium.
- `hero_desktop_1920x1080.jpg` — Desktop
- `hero_mobile_1080x1920.jpg` — Mobile
- `hero_tablet_1200x800.jpg` — Tablet
**SHOPIFY:** Usa `hero_desktop_1920x1080.jpg` na secção Image Banner da homepage.

### 06_redes_sociais/
Imagens prontas para todas as plataformas.
- `instagram_perfil_320x320.png` — Foto de perfil Instagram
- `instagram_perfil_fundo_preto_320x320.jpg` — Alternativa com fundo
- `facebook_perfil_170x170.png` — Foto de perfil Facebook
- `facebook_cover_820x312.jpg` — Capa do Facebook
- `instagram_story_1080x1920.jpg` — Story do Instagram
- `post_quadrado_1080x1080.jpg` — Post quadrado Instagram/Facebook

### 07_email_assinatura/
Logo para assinaturas de email.
- `assinatura_200w.png` — Tamanho padrão
- `assinatura_300w.png` — Tamanho grande

---

## PROMPT PARA CLAUDE CODE

Usa o seguinte prompt quando estiveres a trabalhar no site com Claude Code:

```
Tenho uma pasta "lion_socks_brand_kit" com todos os assets da marca Lion Socks organizados. 
Preciso que leias os ficheiros e os coloques nos devidos lugares do meu site Shopify:

1. HEADER/LOGO: Usa o ficheiro 02_logo_header/header_300w.png como logo do cabeçalho
2. FAVICON: Usa 04_favicon/favicon_32x32.png como favicon principal e 04_favicon/apple_touch_icon_180x180.png como Apple Touch Icon
3. HERO BANNER: Usa 05_hero_banner/hero_desktop_1920x1080.jpg como imagem principal da homepage (secção Image Banner). Para mobile usa hero_mobile_1080x1920.jpg
4. META TAGS: Usa 06_redes_sociais/post_quadrado_1080x1080.jpg como og:image para partilhas em redes sociais
5. Garante que o logo no header tem max-height de 80px e está centrado
6. O favicon deve estar configurado para todos os dispositivos (incluindo apple-touch-icon)
7. O hero banner deve ocupar 100vh (viewport completo) no desktop

A paleta de cores da marca é:
- Preto: #0F0F0F
- Dourado: #C4A652
- Branco: #FFFFFF
- Cinza escuro: #1A1A1A

Tipografia: serif para títulos, sans-serif para corpo de texto.
```

---
Cores da marca: Preto #0F0F0F | Dourado #C4A652 | Branco #FFFFFF
