# Lang Motos — Site institucional

Site estático (HTML/CSS/JS puro, sem build/bundler) da Lang Motos, Itapetininga-SP.
Projeto da agência **VIBE CODING PROCESS**. Contratos do projeto: `PADROES-AGENCIA.md`
e `BRIEFING-LANG-MOTOS.md` na raiz. Padrões herdados do projeto Remop Retífica.

## Estrutura

```
index.html                 home: hero, serviços, orçamento, loja, sobre, FAQ
institucional.html         história, linha do tempo, diferenciais, galeria
localizacao.html           mapa, como chegar, horário com o dia de hoje

assets/css/style.css       estilos gerais, mobile-first, tokens da marca em :root
assets/js/config.js        ÚNICO ponto de config: WhatsApp, telefone, horário, links
assets/js/main.js          WhatsApp pré-preenchido, menu, modal de agendamento,
                           selo "Aberto agora", montador de orçamento, FAQ,
                           contadores, faixa arrastável (padrão Remop)
assets/js/assistente.js    pré-atendimento guiado (sem backend) → handoff WhatsApp
assets/js/scroll-reveal.js animações GSAP + ScrollTrigger (padrão de motion da agência)
assets/img/                fotos reais (fachada, loja, lateral), logo, OG 1200×630, favicon
robots.txt / sitemap.xml   SEO técnico
netlify.toml               pronto pra migração (headers de segurança e cache)
```

Header, footer, assistente, modal e lista de scripts são idênticos nas 3 páginas
(site sem build → compartilhamento por duplicação, mesmo trade-off do Remop).
Alterou um desses blocos? Replique nas 3.

## Funcionalidades

- **Selo "Aberto agora / Fechado · abre às 9h"** calculado no fuso de São Paulo a
  partir de `LANG_CONFIG.horario` (atualiza a cada minuto).
- **Orçamento em 3 passos** com prévia ao vivo em balão de WhatsApp.
- **Assistente de pré-atendimento**: 4 toques (motivo → detalhe → moto → nome),
  dicas de segurança (ex.: freio) e resumo enviado ao atendente humano.
  Nunca fecha orçamento sozinho (regra da agência).
- **Agendamento** em modal → mensagem estruturada no WhatsApp.
- **SEO**: JSON-LD `MotorcycleRepair` com nota agregada, `FAQPage`, Open Graph, canonical.
- **Acessibilidade**: skip-link, foco visível, `aria-*` em menus/acordeão/diálogos,
  `prefers-reduced-motion` respeitado; o site funciona sem JS e sem GSAP.

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
