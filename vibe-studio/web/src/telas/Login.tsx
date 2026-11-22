import React, { useState } from 'react';
import { api } from '../api';
import { Girando, Icone } from '../ui';

export const Login: React.FC<{ senhaDefinida: boolean; aoEntrar: () => void }> = ({ senhaDefinida, aoEntrar }) => {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      await api.enviar('/api/login', { senha });
      aoEntrar();
    } catch (er) {
      setErro((er as Error).message);
    } finally {
      setEnviando(false);
    }
  };
  return (
    <form className="pilha" onSubmit={entrar} style={{ paddingTop: '12vh' }}>
      <div className="pilha-p centro" style={{ alignItems: 'center' }}>
        <div style={{ width: 76, height: 76, borderRadius: 24, background: 'linear-gradient(135deg,#5b3df5,#8b5cf6)', display: 'grid', placeItems: 'center', color: '#fff', boxShadow: '0 12px 30px rgba(91,61,245,.35)' }}>
          <Icone nome="play" tam={34} />
        </div>
        <h1 style={{ marginTop: 10 }}>Vibe Studio</h1>
        <p className="suave">Seu estúdio de vídeos com IA, no celular.</p>
      </div>
      {!senhaDefinida && <div className="aviso">A senha do app ainda não foi definida. Configure a variável <b>SENHA_APP</b> na hospedagem.</div>}
      <label className="campo">
        <span>Senha</span>
        <input className="entrada" type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" />
      </label>
      {erro && <div className="aviso erro">{erro}</div>}
      <button className="botao primario grande largo" disabled={!senha || enviando}>{enviando ? <Girando /> : null} Entrar</button>
    </form>
  );
};
