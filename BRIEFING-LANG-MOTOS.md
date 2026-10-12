# BRIEFING — Site Lang Motos
> Handoff do projeto. Ler junto com `PADROES-AGENCIA.md` (raiz do repo).

---

## 1. Contexto do negócio

- **Nome**: Lang Motos — Oficina, Peças e Acessórios
- **Razão social / CNPJ**: João Langleberto Ferraz Junior — 02.063.586/0001-69 (aberto em 1997)
- **Endereço**: Av. Cinco de Novembro, 825 — Vila Nastri, Itapetininga - SP, 18207-320
- **Serviços (letreiro da fachada)**: Oficina · Peças · Acessórios · Retífica · Alinhamento de chassis
- **Contatos**: fixo (15) 3271-9398 · WhatsApp (15) 99810-6057 · Instagram @lang_motos
- **Prova social**: Google 4,4★ com 132 avaliações · "28 anos de história" (bio do Instagram)
- **Slogan (letreiro)**: "Sonho de um servo, realidade de Deus"
- **Presença hoje**: Google Meu Negócio, Instagram (0 posts), Guia Mais Prático, diretórios (Apontador, SoluTudo, AppLocal). Nenhum site próprio.

## 2. Fontes da informação (rastreabilidade)

| Dado | Fonte |
|---|---|
| Endereço, telefone fixo | Letreiro, Google, Guia Mais Prático, Apontador, SoluTudo |
| WhatsApp | Letreiro + bio do Instagram (`wa.me/5515998106057`) |
| Nota 4,4 / 132 avaliações | Ficha do Google (print enviado pelo José, out/2026) |
| Fundação 1997 / CNPJ | Econodata, CNPJ.biz |
| Horário seg–sex 9h–18h | Apontador — **confirmar com o cliente** |
| Sábado | **Não encontrado** — site mostra "Consulte" |

## 3. Identidade visual (extraída da fachada)

- Laranja do letreiro `#E8572A` · Azul royal do lettering `#1F3C9E` (contorno branco)
- Amarelo da faixa de serviços `#F2C230` sobre preto/asfalto `#121317`
- Bordô do logo `#A92A35` · **xadrez vermelho/azul** do rodapé da fachada → vira divisor no site
- Tipografia: Russo One (marca/números) · Barlow Condensed (títulos, padrão da agência) · Inter (texto)

## 4. Estrutura do site

1. **Header fixo** — marca em "placa", telefone, assistente, CTA "Agendar horário", menu animado.
2. **Hero** — foto real da fachada, faixa arrastável de contatos, selo **Aberto agora/Fechado** em tempo real, CTA WhatsApp + Orçamento.
3. **Prova rápida** — 28 anos · 4,4★ (132) · 5 especialidades · oficina + loja (contadores animados).
4. **Letreiro rolante** — serviços da fachada correndo.
5. **Serviços** (6 cards) — cada "Pedir orçamento" pré-marca o serviço no montador.
6. **Orçamento em 3 passos** — moto + serviços + detalhe → prévia em balão de WhatsApp → envia.
7. **Loja** — categorias de peças/acessórios com mensagem pronta no WhatsApp.
8. **Sobre (teaser)** + card de avaliação Google.
9. **FAQ** acordeão (com schema FAQPage pra SEO).
10. **CTA final** + rodapé com xadrez.
- **institucional.html** — história, linha do tempo, diferenciais, galeria real.
- **localizacao.html** — mapa, Google Maps/Waze, tabela de horário com o dia de hoje destacado.

## 5. Pendências com o cliente

1. Confirmar horário (seg–sex e **sábado**) → editar só `assets/js/config.js` e o JSON-LD.
2. Fotos melhores: oficina por dentro, equipe, estoque de peças/capacetes (as atuais são do Google).
3. Logo em alta (vetor/PNG) — hoje a marca é recriada em CSS e o cartão do logo é um recorte.
4. Domínio próprio (sugestões: `langmotos.com.br`, `langmotositapetininga.com.br`).
5. Marcas de peças com que trabalham (pra enriquecer a seção Loja sem chutar).
