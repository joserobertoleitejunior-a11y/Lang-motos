# Plano da Vibe Coding Process

Ideias organizadas a partir das conversas de novembro de 2026. Quem faz cada coisa: **José** (só você pode fazer: contas, conversas com clientes, decisões) ou **Claude** (código, conteúdo, testes).

## 1. Colocar no ar (esta semana)

| # | Tarefa | Quem | Status |
|---|---|---|---|
| 1 | Novo site da VCP com portfólio, arcade de letras e Mundo 3D | Claude | Pronto neste repositório |
| 2 | Ligar o GitHub Pages ou conectar o repositório na Netlify (`vibecodingprocess.netlify.app`) | José | Pendente (passo a passo no README) |
| 3 | Confirmar o WhatsApp de atendimento (o site usa o do site antigo: (15) 99668-8070) | José | Pendente |
| 4 | Definir o novo @ do Instagram pessoal e o @ da VCP e colocar em `assets/js/config.js` | José + Claude | Pendente |
| 5 | Passar os links do Auto Posto Miquira III e da Comercial Av 5 (estão como “link em breve”) | José | Pendente |
| 6 | Pedir autorização da Lang Motos, San Comércio e Remop para aparecerem no portfólio (ainda não fecharam) | José | Pendente |
| 7 | Decidir os preços que vão para o site (o site antigo e o documento do SaaS têm valores diferentes) | José | Pendente |

## 2. Instagram

- Perfil pessoal vira **Criador de conteúdo**, com o seu nome no @. Posts antigos são **arquivados**, não apagados. Destaque “Antes” guarda a história.
- Bio pessoal: *Jose Roberto · Crio soluções com IA para negócios locais · Sites, apps, bots e vídeos · Fundador @vibecodingprocess*
- Bio VCP: *VIBE CODING PROCESS · Soluções com IA para o comércio local · Sites, apps, WhatsApp automático e vídeos · Por Jose Roberto · Jogue o arcade de letras 👇*
- Link na bio: este site.
- Posts em **Collab** (aparecem nos dois perfis): metade dos Reels.
- Formato: ensina ou mostra uma curiosidade, e no final chama para **comentar, salvar ou mandar para alguém**, sem vender.
- Ideias que já saem deste site: “jogos clássicos feitos só de letras” (gravar a tela do arcade), “bati X pontos, duvido você” (o botão *Desafiar um amigo* já gera o link), “um mundo inteiro feito em código” (passeio no Mundo 3D), “antes e depois” de sites de clientes autorizados.

## 3. WhatsApp de atendimento

1. **Hoje (grátis):** chip separado + app **WhatsApp Business**: perfil da empresa, catálogo, mensagem de saudação, mensagem de ausência, respostas rápidas e etiquetas. O site já leva para esse número com a mensagem pronta.
2. **Automação oficial:** **WhatsApp Cloud API** da Meta: criar app em developers.facebook.com → adicionar o produto WhatsApp → número → token e webhook. Cobra por conversa (ver tabela atual da Meta). O robô (IA que responde, agenda e anota pedido) roda num servidor nosso.
3. **Atalho não oficial (Evolution API, UazAPI):** mais barato e rápido, mas com risco de bloqueio do número. Só com número separado e para quem já falou com você primeiro.

As chaves nunca vão no código nem no chat: ficam guardadas no servidor (variáveis de ambiente).

## 4. Produtos da agência

- **SaaS de atendimento no WhatsApp** (documento de produto v1): bot com IA por nicho (delivery, agenda, catálogo, qualificação de leads), painel do cliente e painel do José. Próximo passo: protótipo do painel e piloto com a Pizza em Dobro.
- **Matriz** (plataforma: agenda, delivery e serviços da cidade): já no ar.
- **Confere Aí** (PDV, estoque, financeiro): em desenvolvimento.
- **VCP Studio** (vídeos com IA): pronto em modo demonstração, falta decidir as chaves pagas.

## 5. Mais ideias

- **Página por cliente** no site com o “antes e depois” e um depoimento em vídeo de 15 segundos.
- **Diagnóstico grátis em 1 minuto:** o visitante cola o link do Instagram ou do Google da loja e recebe 3 melhorias. Gera conversa no WhatsApp.
- **Ranking do arcade** com apelido (precisa de um banco simples). Um ranking semanal vira post fixo no Instagram.
- **Jogo com a marca do cliente:** o arcade com o logo e as cores da loja vira brinde para campanha (“bata 50 pontos e ganhe 10% de desconto”).
- **Selo “Desenvolvido por Vibe Coding Process”** em todos os sites, levando para este site.
- **Domínio próprio** (ex.: vibecodingprocess.com.br): pesa na confiança e no Google.
- **Google Meu Negócio** da própria VCP, com fotos dos projetos.
