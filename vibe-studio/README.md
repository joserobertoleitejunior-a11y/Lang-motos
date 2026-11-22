# Vibe Studio

Estúdio de vídeos curtos com IA, feito para usar **no celular**. Você escreve o que quer, manda algumas fotos de referência, e uma equipe de IAs cuida do resto: roteiro, narração (até com a **sua voz clonada**), imagens, cenas animadas, edição, legendas, música, revisão e o MP4 final no formato do Reels, do TikTok, do Shorts ou do Status.

Criado pela **VIBE CODING PROCESS** — sites e conteúdo para o comércio local.

---

## O que ele já faz

- **Pedido em texto + fotos** → roteiro completo, cena por cena (12 tipos de cena: abertura, número que conta, celular, lista, produto com preço, antes × depois, impacto, foto em tela cheia, chamada final…).
- **Prévia ao vivo no celular**: o vídeo aparece montado na hora, antes de gerar o arquivo.
- **Edição por conversa**: "deixa mais curto", "troca a música", "coloca o preço maior". Só o que mudou é refeito, então sai mais rápido e mais barato.
- **Vozes**: narração natural em português, diálogo com duas vozes e **clonagem de voz** (a sua e a da sua esposa, com autorização).
- **Imagens por IA**: cria personagens e cenários, recorta fundo, edita as suas fotos (troca o fundo, melhora a luz).
- **Cenas animadas**: transforma uma imagem num clipe de vídeo de 5 segundos.
- **Marcas (clientes)**: logo, cores, contatos e personagens de cada comércio, usados em todos os vídeos.
- **Revisor automático**: um agente olha cada cena pronta e corrige texto cortado, contraste ruim e erros.
- **Volume no padrão das redes** (-14 LUFS), legenda do post pronta com hashtags, botão de **compartilhar direto** para Instagram/WhatsApp.
- **Controle de custos**: estimativa por vídeo e por mês, com limites de gasto.
- **Modo demonstração**: sem nenhuma chave, ele já monta vídeos com as suas fotos, o mascote, a trilha e os efeitos (que são do próprio app, sem direitos autorais de terceiros).

## Como funciona (a "equipe")

```
Pedido + fotos
   │
   ▼
Diretor (Claude) ── escreve o roteiro em cenas (JSON validado)
   │
   ├─► Narrador (ElevenLabs ou Google) ── fala + tempo de cada palavra (legenda sincronizada)
   ├─► Diretor de arte (OpenAI ou Google) ── imagens, recortes, edição de fotos
   ├─► Animador (fal.ai / Kling) ── cenas que viram vídeo
   ├─► Sonoplasta ── trilha (biblioteca do app ou música exclusiva por IA) + efeitos
   ▼
Montador (Remotion) ── animações, transições, legendas, mixagem
   │
   ▼
Revisor (Claude, vendo os quadros) ── corrige o que estiver ruim
   │
   ▼
MP4 final (normalizado) + capa + legenda do post
```

## Publicar na internet (pelo celular, ~15 minutos)

Recomendado: **Railway** (aceita Docker e disco persistente).

1. Tenha este código num repositório **privado** do GitHub (ex.: `vibe-studio`).
2. Entre em **railway.com** com a sua conta do GitHub → **New Project** → **Deploy from GitHub repo** → escolha o `vibe-studio`. O Railway encontra o `Dockerfile` sozinho.
3. No serviço criado, adicione um **Volume** com o caminho de montagem **`/data`** (é onde ficam projetos, vídeos e chaves).
4. Em **Variables**, crie **`SENHA_APP`** com uma senha forte (12+ caracteres). Só ela é obrigatória.
5. Em **Settings → Networking**, gere um domínio público. Abra o endereço no celular, entre com a senha e use **"Adicionar à tela inicial"**: ele vira um app.
6. Em **Ajustes** dentro do app, cole as chaves das IAs (ou coloque-as em Variables: veja `.env.exemplo`).

Dica: deixe pelo menos 2 GB de memória para o serviço (o render usa um Chrome sem tela). Confira o preço atual do plano no site do Railway.

## As chaves das IAs

Cada IA é um serviço contratado por uso; você cria a conta, adiciona crédito e gera uma chave (uma senha longa). O guia completo está dentro do app em **Ajustes → Como conseguir**.

| Serviço | Para quê | Custo aproximado |
|---|---|---|
| Claude (console.anthropic.com) | Roteiro, edição por chat, revisão | US$ 0,05–0,15 por vídeo |
| ElevenLabs (elevenlabs.io) | Voz, clonagem, música | Starter US$ 6/mês (uso comercial) |
| OpenAI (platform.openai.com) | Imagens com fundo transparente, edição de fotos | ~US$ 0,05 por imagem |
| Google Gemini (aistudio.google.com) | Imagens Nano Banana, voz econômica | ~US$ 0,05 por imagem 2K |
| fal.ai | Cenas animadas (Kling), recorte de fundo | ~US$ 0,35 por cena de 5 s |

Começo mais barato: **Claude + ElevenLabs Starter**. Depois, imagens (Gemini ou OpenAI). Por último, cenas animadas.

> A assinatura do app Claude (Pro/Max) não inclui a API: é uma conta separada, paga por uso.
> O plano gratuito da ElevenLabs não permite uso comercial.
> Valores conferidos em novembro de 2026 nas páginas oficiais; podem mudar.

## Rodar no computador (desenvolvimento)

```bash
npm install
npm run build                       # app web
SENHA_APP=uma-senha-forte npm run servidor   # http://localhost:8080 (PORT para mudar)
npm run dev                         # app web com recarga automática (usa o servidor em 8787)
npm run demo                        # renderiza o vídeo de demonstração em out/
npm run verificar                   # checagem de tipos
```

Precisa de Node 20+ e ffmpeg instalados.

## Estrutura

```
src/shared/      contrato do vídeo (spec.ts), linha do tempo, roteiros de demonstração
src/video/       motor de vídeo (Remotion): layouts, mascote, legendas, transições
src/server/      servidor (Fastify): pipeline dos agentes, provedores de IA, render, chaves
web/             app de celular (React + Vite, instalável como PWA)
public/          fontes, efeitos sonoros e trilhas (geradas por scripts/gerar_audio.py)
```

## Segurança e privacidade

- Um único acesso, protegido por senha (cookie seguro, limite de tentativas).
- Chaves das IAs: ou nas variáveis da hospedagem, ou coladas no app (criptografadas com AES-256-GCM no disco). Nunca voltam inteiras para a tela.
- **Clonagem de voz só com autorização** do dono da voz; o app registra quem autorizou e quando.
- Não envie chaves por WhatsApp, e-mail ou chat. Se uma chave vazar, apague-a no site do serviço e crie outra.

## Licenças

- Motor de vídeo: [Remotion](https://www.remotion.dev) — gratuito para pessoas físicas e empresas com até 3 pessoas (inclusive uso comercial e renders automáticos). Acima disso, é preciso a licença de empresa.
- Fontes: Google Fonts via Fontsource (licença OFL).
- Trilhas e efeitos sonoros: gerados por código neste projeto (`scripts/gerar_audio.py`), livres para uso.
