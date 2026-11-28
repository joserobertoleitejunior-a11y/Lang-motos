# Vibe Coding Process — site

Site da **Vibe Coding Process**: soluções com IA para o comércio local, feito em Itapetininga-SP por Jose Roberto.

- `index.html`: página principal (cubo de letras, soluções, projetos, arcade, quem faz e contato pelo WhatsApp)
- `jogos.html`: VCP Arcade em tela cheia. Abra direto um jogo com `jogos.html#blocos`, `#cobrinha`, `#voo`, `#invasores`, `#pong`, `#quebra-blocos` ou `#areia`
- `mundo/`: Mundo VCP 3D (gerado pelo `vibe-studio/mundo` do repositório lang-motos)

O site é estático: HTML, CSS e JavaScript puros, sem etapa de build.

## Onde mudar as coisas

| O que | Arquivo |
|---|---|
| WhatsApp, Instagram e cidade | `assets/js/config.js` |
| Projetos do portfólio (nome, texto, link, imagem, mostrar/esconder) | `assets/js/projetos.js` + imagem em `assets/img/portfolio/<id>.jpg` (960×600) |
| Textos da página | `index.html` |
| Cores e fontes | começo de `assets/css/site.css` (`:root`) |
| Jogos do arcade | `assets/js/arcade/jogos/*.js` (um arquivo por jogo) |
| Motor que transforma desenho em letras | `assets/js/letras.js` |
| Imagem de compartilhamento (WhatsApp/Instagram) | abra `ferramentas/og.html` e tire o print em 1200×630 |

Para esconder um projeto enquanto o cliente não autoriza, use `mostrar: false` em `assets/js/projetos.js`.

## Rodar no computador

```bash
npm run dev      # abre em http://localhost:8080
npm test         # testes de ponta a ponta (Playwright)
npm run lint     # Biome
```

## Colocar no ar

**GitHub Pages:** no GitHub, abra o repositório → Settings → Pages → *Build and deployment* → Source: **Deploy from a branch** → Branch: **main** e pasta **/ (root)** → Save. Em 1 a 2 minutos o site fica em `https://joserobertoleitejunior-a11y.github.io/vibe-coding-process/`.

**Netlify (recomendado para manter o endereço antigo):** os selos “Desenvolvido por Vibe Coding Process” dos sistemas dos clientes apontam para `vibecodingprocess.netlify.app`. No painel da Netlify, abra esse site → Site configuration → Build & deploy → *Link repository* → escolha este repositório (branch `main`, sem comando de build, pasta de publicação `.`). Depois troque o endereço nas tags `canonical`/`og:url` de `index.html`, `jogos.html` e `mundo/index.html`, em `robots.txt` e em `sitemap.xml`.

## Atualizar o Mundo 3D

No repositório lang-motos, pasta `vibe-studio`:

```bash
SITE_DIR=../caminho/para/vibe-coding-process/mundo node mundo/construir.mjs
```

Os quadros do mundo vêm de `vibe-studio/mundo/projetos.json`.

Padrões técnicos da agência: `PADROES-AGENCIA.md`. Plano e próximos passos: `PLANO.md`.
