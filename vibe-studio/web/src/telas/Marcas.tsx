import React, { useEffect, useRef, useState } from 'react';
import { api, type Marca } from '../api';
import { prepararFoto } from '../imagens';
import { Carregando, Girando, Icone, ir, Topo, useCarregar, useToast } from '../ui';

export const Marcas: React.FC<{ id?: string }> = ({ id }) => {
  if (id) return <EditarMarca id={id === 'nova' ? null : id} />;
  return <ListaMarcas />;
};

const ListaMarcas: React.FC = () => {
  const marcas = useCarregar(() => api.get<Marca[]>('/api/marcas'));
  return (
    <div className="pilha">
      <Topo titulo="Marcas" />
      <p className="suave pequeno">Cadastre cada comércio que você atende: logo, cores, contatos e personagens. O Diretor usa tudo isso nos vídeos.</p>
      <a className="botao primario largo" href="#/marcas/nova"><Icone nome="mais" /> Nova marca</a>
      {marcas.carregando && !marcas.dados && <Carregando />}
      {marcas.dados?.length === 0 && <div className="cartao vazio"><Icone nome="marca" tam={32} /><p className="suave">Nenhuma marca ainda.</p></div>}
      {marcas.dados?.map((m) => (
        <a key={m.id} className="cartao linha" href={`#/marcas/${m.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: m.cores[0] ?? 'var(--primaria-clara)', display: 'grid', placeItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {m.logo ? <img src={`/midia/m/${m.id}/${m.logo}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }} /> : <span style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>{m.nome.slice(0, 1)}</span>}
          </div>
          <div className="cresce">
            <div className="forte">{m.nome}</div>
            <div className="mini suave">{[m.segmento, m.contato.whatsapp && 'WhatsApp', m.contato.instagram && 'Instagram', m.personagens.length && `${m.personagens.length} personagem(ns)`].filter(Boolean).join(' · ') || 'Toque para completar'}</div>
          </div>
          <Icone nome="direita" />
        </a>
      ))}
    </div>
  );
};

const EditarMarca: React.FC<{ id: string | null }> = ({ id }) => {
  const toast = useToast();
  const [m, setM] = useState<Marca | null>(null);
  const [salvando, setSalvando] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const persRef = useRef<HTMLInputElement>(null);
  const [novoPers, setNovoPers] = useState({ nome: '', descricao: '', foto: null as File | null });

  useEffect(() => {
    if (!id) { setM({ id: '', nome: '', segmento: '', descricao: '', cores: ['#5B3DF5', '#FF7A2F'], logo: null, contato: {}, personagens: [] }); return; }
    api.get<Marca[]>('/api/marcas').then((l) => setM(l.find((x) => x.id === id) ?? null));
  }, [id]);
  if (!m) return <Carregando />;

  const mudar = (k: Partial<Marca>) => setM({ ...m, ...k });
  const contato = (k: keyof Marca['contato'], v: string) => setM({ ...m, contato: { ...m.contato, [k]: v } });

  const salvar = async () => {
    if (!m.nome.trim()) { toast('Dê um nome para a marca.'); return; }
    setSalvando(true);
    try {
      const corpo = { nome: m.nome, segmento: m.segmento, descricao: m.descricao, cores: m.cores, contato: m.contato };
      const r = id ? await api.enviar<Marca>(`/api/marcas/${id}`, corpo, 'PUT') : await api.enviar<Marca>('/api/marcas', corpo);
      toast('Marca salva!');
      if (!id) ir(`marcas/${r.id}`); else setM(r);
    } catch (e) { toast((e as Error).message); } finally { setSalvando(false); }
  };

  const enviarLogo = async (f: File | undefined) => {
    if (!f || !id) return;
    const form = new FormData();
    form.append('logo', await prepararFoto(f, 1024), f.name);
    try { setM(await api.formulario<Marca>(`/api/marcas/${id}/logo`, form)); toast('Logo atualizado!'); } catch (e) { toast((e as Error).message); }
  };

  const adicionarPersonagem = async () => {
    if (!id || !novoPers.nome || !novoPers.descricao) { toast('Preencha nome e aparência.'); return; }
    const form = new FormData();
    form.append('nome', novoPers.nome);
    form.append('descricao', novoPers.descricao);
    if (novoPers.foto) form.append('imagem', await prepararFoto(novoPers.foto, 1536), novoPers.foto.name);
    try { setM(await api.formulario<Marca>(`/api/marcas/${id}/personagens`, form)); setNovoPers({ nome: '', descricao: '', foto: null }); toast('Personagem adicionado!'); } catch (e) { toast((e as Error).message); }
  };

  return (
    <div className="pilha">
      <Topo titulo={id ? m.nome || 'Marca' : 'Nova marca'} voltar="marcas" direita={id ? (
        <button className="icone-botao" aria-label="Apagar marca" onClick={async () => { if (confirm('Apagar esta marca?')) { await api.apagar(`/api/marcas/${id}`); ir('marcas'); } }}><Icone nome="lixo" tam={20} /></button>
      ) : undefined} />

      <section className="cartao pilha">
        <label className="campo"><span>Nome do comércio</span><input className="entrada" value={m.nome} onChange={(e) => mudar({ nome: e.target.value })} placeholder="Ex.: Padaria Pão Dourado" /></label>
        <label className="campo"><span>Segmento</span><input className="entrada" value={m.segmento} onChange={(e) => mudar({ segmento: e.target.value })} placeholder="Ex.: padaria, barbearia, loja de roupas" /></label>
        <label className="campo"><span>Sobre o negócio</span><textarea className="entrada" rows={3} value={m.descricao} onChange={(e) => mudar({ descricao: e.target.value })} placeholder="Diferenciais, público, bairro, tom de voz…" /></label>
        <div className="campo">
          <span>Cores da marca</span>
          <div className="linha">
            {[0, 1].map((i) => (
              <label key={i} className="linha pequeno">
                <input type="color" className="cor" value={m.cores[i] ?? '#888888'} onChange={(e) => { const c = [...m.cores]; c[i] = e.target.value.toUpperCase(); mudar({ cores: c }); }} />
                {i === 0 ? 'Principal' : 'Destaque'}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="cartao pilha">
        <div className="secao-titulo">Contatos (aparecem no final do vídeo)</div>
        <label className="campo"><span>WhatsApp</span><input className="entrada" inputMode="tel" value={m.contato.whatsapp ?? ''} onChange={(e) => contato('whatsapp', e.target.value)} placeholder="(11) 98765-4321" /></label>
        <label className="campo"><span>Instagram</span><input className="entrada" value={m.contato.instagram ?? ''} onChange={(e) => contato('instagram', e.target.value)} placeholder="@seunegocio" /></label>
        <label className="campo"><span>Site</span><input className="entrada" inputMode="url" value={m.contato.site ?? ''} onChange={(e) => contato('site', e.target.value)} placeholder="www.seunegocio.com.br" /></label>
        <label className="campo"><span>Endereço</span><input className="entrada" value={m.contato.endereco ?? ''} onChange={(e) => contato('endereco', e.target.value)} placeholder="Rua, número, bairro" /></label>
      </section>

      <button className="botao primario grande largo" disabled={salvando} onClick={salvar}>{salvando ? <Girando /> : <Icone nome="check" />} Salvar marca</button>

      {id && (
        <>
          <section className="cartao pilha">
            <div className="secao-titulo">Logotipo</div>
            {m.logo && <img src={`/midia/m/${id}/${m.logo}`} alt="Logo" style={{ maxHeight: 120, objectFit: 'contain', background: '#fff', borderRadius: 14, padding: 8 }} />}
            <button className="botao contorno" onClick={() => logoRef.current?.click()}><Icone nome="foto" /> {m.logo ? 'Trocar logo' : 'Enviar logo'}</button>
            <input ref={logoRef} type="file" accept="image/*" hidden onChange={(e) => enviarLogo(e.target.files?.[0])} />
            <p className="dica">PNG com fundo transparente fica perfeito.</p>
          </section>

          <section className="cartao pilha">
            <div className="secao-titulo">Personagens da marca</div>
            <p className="dica">Um mascote ou uma pessoa que aparece sempre igual nos vídeos. Com foto de referência, a IA mantém o mesmo rosto/visual.</p>
            {m.personagens.map((pp) => (
              <div key={pp.id} className="cartao-plano linha">
                {pp.imagem && <img src={`/midia/m/${id}/${pp.imagem}`} alt="" style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }} />}
                <div className="cresce"><div className="forte">{pp.nome}</div><div className="mini suave">{pp.descricao}</div></div>
                <button className="icone-botao" aria-label="Remover" onClick={async () => setM(await api.apagar<Marca>(`/api/marcas/${id}/personagens/${pp.id}`))}><Icone nome="lixo" tam={18} /></button>
              </div>
            ))}
            <input className="entrada" value={novoPers.nome} onChange={(e) => setNovoPers({ ...novoPers, nome: e.target.value })} placeholder="Nome (ex.: Chef Tomás)" />
            <textarea className="entrada" rows={2} value={novoPers.descricao} onChange={(e) => setNovoPers({ ...novoPers, descricao: e.target.value })} placeholder="Aparência fixa (ex.: tomate fofo com chapéu de chef e bigode)" />
            <div className="linha">
              <button className="botao contorno cresce" onClick={() => persRef.current?.click()}><Icone nome="foto" /> {novoPers.foto ? 'Foto escolhida' : 'Foto (opcional)'}</button>
              <button className="botao cresce" onClick={adicionarPersonagem}><Icone nome="mais" /> Adicionar</button>
            </div>
            <input ref={persRef} type="file" accept="image/*" hidden onChange={(e) => setNovoPers({ ...novoPers, foto: e.target.files?.[0] ?? null })} />
          </section>
        </>
      )}
    </div>
  );
};
