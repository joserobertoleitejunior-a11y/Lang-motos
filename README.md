# Lang Motos — Site institucional

Site estático (HTML/CSS/JS puro, sem build/bundler) da Lang Motos, Itapetininga-SP.
Projeto da agência **VIBE CODING PROCESS**. Contratos do projeto: `PADROES-AGENCIA.md`
e `BRIEFING-LANG-MOTOS.md` na raiz. Padrões de engenharia herdados do projeto Remop Retífica (identidade visual própria).

## Estrutura

```
index.html                 home: hero, ficha técnica, serviços, galeria, ordem de serviço,
                           loja, história, FAQ, chamada final
institucional.html         história, linha do tempo, pilares, galeria
localizacao.html           mapa, contato, horário com o dia de hoje

assets/css/style.css       sistema visual próprio (tokens em :root, mobile-first)
assets/js/config.js        ÚNICO ponto de config: WhatsApp, telefone, horário, links
assets/js/main.js          WhatsApp pré-preenchido, menu em tela cheia, dock de widgets,
                           agendamento, horário ao vivo, ordem de serviço, FAQ, contadores
assets/js/assistente.js    pré-atendimento guiado (sem backend) → handoff pro WhatsApp
assets/js/movimento.js     abertura (odômetro), rolagem suave (Lenis), coreografia GSAP,
                           letreiro guiado pela rolagem, indicador de seção, lightbox
assets/img/                fotos reais em HD (WebP responsivo + JPG), logo, OG, favicon
robots.txt / sitemap.xml   SEO técnico · netlify.toml pronto pra migração
```

## Identidade visual (própria da Lang Motos)

Minimalista com pegada motocross: tinta preta, papel de oficina e o laranja do letreiro.
O xadrez vermelho/azul da fachada aparece só como detalhe (marca, rodapé do botão).

- **Fontes**: Saira condensada itálica (títulos, de corrida), Saira Stencil One (números de
  placa/peça) e IBM Plex Mono (ficha técnica, rótulos).
- **Botões**: placa chanfrada, sem gradiente, com preenchimento que corre no hover.
- **Widgets flutuantes**: dock de vidro (WhatsApp, telefone, rota, horário, pré-atendimento);
  cada ícone abre um painel transparente, um por vez. No desktop o dock fica na lateral.
- **Orçamento**: formulário em formato de ordem de serviço, com prévia em "ticket".
- **Rolagem**: suave com inércia (Lenis), cabeçalho que some ao descer, fotos que abrem como
  porta de enrolar, letreiro que acelera com a rolagem e cravos de pneu que giram.
  Respeita `prefers-reduced-motion` e degrada para a rolagem nativa sem JS.

## Imagens em HD

As fotos originais eram de baixa resolução (prints de ~1080px). Foram ampliadas 4×
com **Real-ESRGAN x4plus** (super-resolução por IA, rodado localmente via ONNX),
com leve acabamento de contraste/nitidez, e exportadas em tamanhos responsivos:

| Arquivo | Tamanhos (WebP) | Fallback JPG |
|---|---|---|
| `fachada-lang-motos` | 960 · 1600 · 2560 | 1600 |
| `loja-interna-lang-motos` | 1200 · 2240 | 1200 |
| `fachada2-lang-motos` | 1280 · 2400 | 1280 |
| `lateral-lang-motos` | 800 · 1400 | 800 |
| `logo-lang-motos` | 1288 | 640 |

O HTML usa `<picture>` + `srcset/sizes`: o celular baixa a versão leve e telas
grandes/retina a HD. A foto do hero tem `preload` + `fetchpriority="high"`.
Ao trocar por fotos novas do cliente, manter os mesmos nomes e larguras.

## Editar dados do negócio

Tudo em `assets/js/config.js`. Se mudar o horário, atualize também o
`openingHoursSpecification` do JSON-LD nas 3 páginas.

## Publicar (GitHub Pages)

Settings → Pages → Deploy from branch → escolher a branch e a pasta `/ (root)`.
URL esperada: `https://joserobertoleitejunior-a11y.github.io/lang-motos/`
(já usada em canonical, OG, robots e sitemap — trocar quando houver domínio próprio).

## Próximas fases (mesmo roteiro do Remop)

1. Netlify + Function de IA (Claude Haiku) por trás do assistente.
2. Supabase: gravar agendamentos/leads e painel administrativo com login.
3. Galeria administrável e analytics leve de cliques em CTAs.
