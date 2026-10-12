# PADRÕES-AGENCIA.md
### VIBE CODING PROCESS — arquivo mestre de padrões
> Criado por José. Define as regras fixas que **todo projeto novo** da agência segue, independente do cliente, do stack específico ou de qual agente/modelo de IA está executando o código.
>
> **Como usar**: cole este arquivo na raiz de todo projeto novo (`PADROES-AGENCIA.md`) e referencie ele no início de qualquer sessão de execução — humana ou de IA. É o "contrato" que qualquer agente deve respeitar sem precisar ser lembrado toda vez. Se um agente de IA sugerir algo que contradiz este arquivo, este arquivo vence.

---

## 0. Contexto do projeto

- **Cliente**: Lang Motos — Oficina, Peças e Acessórios (CNPJ 02.063.586/0001-69, desde 1997)
- **Cidade**: Itapetininga-SP — Av. Cinco de Novembro, 825, Vila Nastri, 18207-320
- **Tipo**: site institucional público, estático (HTML/CSS/JS puro), GitHub Pages → Netlify
- **Contatos**: fixo (15) 3271-9398 · WhatsApp (15) 99810-6057 · Instagram @lang_motos
- **Referência de padrão**: projeto Remop Retífica (mesma agência, mesma avenida)
- **Responsável**: José — VIBE CODING PROCESS

---

## 1–9. Regras fixas

Todas as seções 1 a 9 do padrão mestre da agência (governança/versionamento, motion e loading, observabilidade/qualidade/testes, segurança, acessibilidade, arquitetura multi-tenant se aplicável, deploy/rollback, checklist de início, SEO) **valem integralmente para este projeto, sem exceção**.

**Notas específicas deste projeto:**
- Site institucional público (não é SaaS interno da agência) → seção 6 (multi-tenant) não se aplica.
- Projeto tem página pública voltada ao cliente final → checklist de SEO (seção 9) é obrigatório, não opcional.
- Assistente de pré-atendimento (hoje fluxo guiado no navegador, sem IA) organiza o pedido, mas **sempre finaliza direcionando pro atendente humano no WhatsApp** — nunca fecha um orçamento nem confirma agendamento sozinho sem handoff humano.

---

## 8. Checklist de início de projeto (status atual)

- [x] Repositório Git criado
- [x] Este arquivo copiado pra raiz, seção 0 preenchida
- [x] `.gitignore` cobrindo `.env*` desde o primeiro commit (ainda não há `.env` — site sem backend)
- [ ] Sentry plugado (front e back)
- [ ] Lint (Biome) configurado
- [ ] RLS — não aplicável se não houver banco multi-tenant; se usar Firestore pro bot, aplicar regras equivalentes
- [ ] Estrutura de testes inicial
- [x] Definido: projeto único de cliente (não SaaS da agência)
- [ ] Autenticação de rota administrativa (se houver painel) separada da pública — sem painel nesta fase
- [ ] Definido: quem tem acesso a produção e onde ficam as chaves

---

*Este arquivo é vivo — atualize conforme o VIBE CODING PROCESS evoluir.*
