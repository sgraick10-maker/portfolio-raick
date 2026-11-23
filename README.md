# raicksilva.com.br

Portfólio de Raick Silva, desenvolvedor Full Stack (web, iOS e mobile) com desenvolvimento agêntico.

- Site estático em `public/` (HTML, CSS e JS sem build), publicado no Cloudflare Pages (projeto `raicksilva`).
- Three.js (rosto em partículas e galeria curva), GSAP ScrollTrigger e Lenis, servidos de `public/vendor/`.
- PT/EN com detecção de país via Cloudflare Pages Function em `functions/api/geo.js`.

## Rodar localmente

```bash
cd public && python3 -m http.server 4321
```

## Publicar

```bash
npx wrangler pages deploy public --project-name raicksilva --branch main
```

Rodar da raiz do repositório, para incluir a pasta `functions/`.
