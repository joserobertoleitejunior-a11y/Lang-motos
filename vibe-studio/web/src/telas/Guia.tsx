import React, { useEffect } from 'react';
import { Icone, Topo } from '../ui';

const SERVICOS = [
  {
    id: 'claude', nome: 'Claude (Anthropic) — o Diretor', faz: 'Escreve o roteiro, escolhe cenas, revisa o vídeo e entende os seus pedidos de alteração no chat.',
    custo: 'Cerca de US$ 0,05 a 0,15 por vídeo.', url: 'https://console.anthropic.com', variavel: 'ANTHROPIC_API_KEY',
    passos: ['Abra console.anthropic.com e crie a conta.', 'Em Billing, adicione um crédito (US$ 5 já dá para dezenas de vídeos).', 'Em API Keys, toque em Create Key, dê um nome e copie a chave (começa com sk-ant-).'],
    obs: 'A assinatura do Claude no app (Pro/Max) é outra coisa: a API é paga à parte, por uso.',
  },
  {
    id: 'vozes', nome: 'ElevenLabs — vozes e clonagem', faz: 'Narra com voz natural em português, clona a sua voz e a da sua esposa e compõe trilhas.',
    custo: 'Plano Starter US$ 6/mês (permite uso comercial e clonagem) ou Creator US$ 22/mês.', url: 'https://elevenlabs.io', variavel: 'ELEVENLABS_API_KEY',
    passos: ['Crie a conta em elevenlabs.io e assine o Starter ou o Creator.', 'Toque no seu perfil → API Keys → Create API Key.', 'Copie a chave e cole em Ajustes.'],
    obs: 'O plano gratuito não permite uso comercial dos áudios.',
  },
  {
    id: 'imagens', nome: 'OpenAI — imagens e edição de fotos', faz: 'Cria imagens e personagens com fundo transparente e edita as suas fotos (troca fundo, melhora luz).',
    custo: 'Cerca de US$ 0,05 por imagem (qualidade média).', url: 'https://platform.openai.com', variavel: 'OPENAI_API_KEY',
    passos: ['Crie a conta em platform.openai.com.', 'Em Billing, adicione crédito.', 'Em API keys, toque em Create new secret key e copie (começa com sk-).'],
    obs: 'A OpenAI pode pedir a verificação da organização para liberar os modelos de imagem.',
  },
  {
    id: 'gemini', nome: 'Google Gemini — imagens Nano Banana e voz econômica', faz: 'Gera e edita imagens a partir das suas fotos e tem vozes baratas. Alternativa à OpenAI.',
    custo: 'Cerca de US$ 0,05 por imagem 2K.', url: 'https://aistudio.google.com', variavel: 'GEMINI_API_KEY',
    passos: ['Entre em aistudio.google.com com a sua conta Google.', 'Toque em Get API key → Create API key.', 'Ative o faturamento no Google Cloud para sair dos limites gratuitos.'],
    obs: '',
  },
  {
    id: 'videos', nome: 'fal.ai — cenas animadas e recorte', faz: 'Transforma uma imagem em vídeo de 5 segundos (Kling) e remove fundo de fotos.',
    custo: 'Cerca de US$ 0,35 por cena animada; recorte por US$ 0,02.', url: 'https://fal.ai', variavel: 'FAL_KEY',
    passos: ['Crie a conta em fal.ai.', 'Em Billing, adicione crédito.', 'Em Keys, crie uma chave e copie.'],
    obs: '',
  },
];

export const Guia: React.FC<{ secao?: string }> = ({ secao }) => {
  useEffect(() => { if (secao) document.getElementById(secao)?.scrollIntoView({ behavior: 'smooth' }); }, [secao]);
  return (
    <div className="pilha">
      <Topo titulo="Guia" voltar="ajustes" />
      <section className="cartao pilha-p">
        <h2>Como o Vibe Studio funciona</h2>
        <p>O app é o seu estúdio; as IAs são a equipe. Cada uma faz uma parte:</p>
        <ol className="passos">
          <li><b>Diretor</b> (Claude) lê o seu pedido e as fotos e escreve o roteiro cena por cena.</li>
          <li><b>Narrador</b> (ElevenLabs ou Google) grava a fala com a voz escolhida, inclusive a sua clonada.</li>
          <li><b>Diretor de arte</b> (OpenAI ou Google) cria ou melhora as imagens.</li>
          <li><b>Animador</b> (fal.ai) dá movimento às cenas mais importantes.</li>
          <li><b>Montador</b> (o próprio app) junta tudo com animações, legendas, música e efeitos.</li>
          <li><b>Revisor</b> (Claude) confere cada cena antes de entregar o MP4.</li>
        </ol>
        <p className="dica">Sem nenhuma chave, o app já funciona em modo demonstração (suas fotos, mascote, música e efeitos).</p>
      </section>

      <section className="cartao pilha-p">
        <h3>O que é uma "chave de API"?</h3>
        <p className="pequeno">É uma senha longa que cada serviço gera para o app usar a sua conta. Você paga só o que usar, direto para cada empresa, em dólar no cartão. Você cria as contas e gera as chaves; ninguém pode fazer isso por você.</p>
        <p className="pequeno"><b>Onde colar:</b> em Ajustes → Colar chave (fica criptografada no servidor) ou nas variáveis da hospedagem.</p>
        <div className="aviso"><Icone nome="info" /><span>Nunca mande uma chave por WhatsApp, e-mail ou chat. Se vazar, apague a chave no site do serviço e crie outra. Defina um limite de gasto em cada serviço.</span></div>
      </section>

      {SERVICOS.map((s) => (
        <section key={s.id} id={s.id} className="cartao pilha-p">
          <h3>{s.nome}</h3>
          <p className="pequeno">{s.faz}</p>
          <span className="preco">{s.custo}</span>
          <ol className="passos pequeno">{s.passos.map((p) => <li key={p}>{p}</li>)}</ol>
          {s.obs && <p className="dica">{s.obs}</p>}
          <p className="dica">Variável na hospedagem: <code>{s.variavel}</code></p>
          <a className="botao pequeno contorno" href={s.url} target="_blank" rel="noreferrer">Abrir {new URL(s.url).hostname}</a>
        </section>
      ))}

      <section className="cartao pilha-p">
        <h3>Por onde começar (mais barato)</h3>
        <ol className="passos pequeno">
          <li>Claude (roteiro) + ElevenLabs Starter (voz e clonagem): vídeos com a sua voz, suas fotos e o mascote.</li>
          <li>Depois, Google Gemini ou OpenAI para imagens novas.</li>
          <li>Por último, fal.ai para cenas animadas (é o item mais caro).</li>
        </ol>
      </section>
    </div>
  );
};
