import React from 'react';

export type NomeIcone = 'check' | 'x' | 'whatsapp' | 'instagram' | 'globo' | 'pin' | 'estrela' | 'seta' | 'coracao' | 'telefone' | 'raio';

/** Ícones simples e genéricos (traço arredondado). */
export const Icone: React.FC<{ nome: NomeIcone; tamanho: number; cor: string; traco?: number; progresso?: number }> = ({ nome, tamanho, cor, traco = 2.6, progresso = 1 }) => {
  const comum = { fill: 'none', stroke: cor, strokeWidth: traco, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let corpo: React.ReactNode;
  switch (nome) {
    case 'check':
      corpo = <path d="M5 12.5 L10 17.5 L19.5 7" {...comum} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progresso} />;
      break;
    case 'x':
      corpo = <><path d="M6.5 6.5 L17.5 17.5" {...comum} /><path d="M17.5 6.5 L6.5 17.5" {...comum} /></>;
      break;
    case 'whatsapp':
      corpo = (
        <>
          <path d="M12 3.2 C 7.1 3.2 3.2 7 3.2 11.8 C 3.2 13.5 3.7 15.1 4.5 16.4 L 3.6 20.4 L 7.7 19.4 C 9 20.1 10.4 20.5 12 20.5 C 16.9 20.5 20.8 16.6 20.8 11.8 C 20.8 7 16.9 3.2 12 3.2 Z" {...comum} />
          <path d="M9.1 8.3 C 9.4 8 9.9 8 10.1 8.4 L 10.8 9.9 C 10.9 10.2 10.8 10.5 10.6 10.7 L 10.2 11.1 C 10.7 12.2 11.6 13.1 12.8 13.7 L 13.2 13.3 C 13.4 13.1 13.7 13 14 13.1 L 15.5 13.8 C 15.9 14 15.9 14.5 15.6 14.8 C 14.9 15.6 13.9 15.9 12.9 15.5 C 10.7 14.7 9 13 8.2 10.8 C 7.9 9.9 8.3 8.9 9.1 8.3 Z" fill={cor} />
        </>
      );
      break;
    case 'instagram':
      corpo = <><rect x="3.5" y="3.5" width="17" height="17" rx="5" {...comum} /><circle cx="12" cy="12" r="4" {...comum} /><circle cx="17" cy="7" r="1.1" fill={cor} /></>;
      break;
    case 'globo':
      corpo = <><circle cx="12" cy="12" r="8.5" {...comum} /><path d="M3.5 12 H20.5" {...comum} /><path d="M12 3.5 C 14.6 6 15.6 9 15.6 12 C 15.6 15 14.6 18 12 20.5 C 9.4 18 8.4 15 8.4 12 C 8.4 9 9.4 6 12 3.5 Z" {...comum} /></>;
      break;
    case 'pin':
      corpo = <><path d="M12 21 C 12 21 5 14.6 5 9.6 C 5 5.7 8.1 3 12 3 C 15.9 3 19 5.7 19 9.6 C 19 14.6 12 21 12 21 Z" {...comum} /><circle cx="12" cy="9.6" r="2.5" {...comum} /></>;
      break;
    case 'estrela':
      corpo = <path d="M12 3.5 L14.5 9 L20.4 9.6 L16 13.6 L17.3 19.5 L12 16.5 L6.7 19.5 L8 13.6 L3.6 9.6 L9.5 9 Z" fill={cor} stroke={cor} strokeWidth={1} strokeLinejoin="round" />;
      break;
    case 'seta':
      corpo = <><path d="M4 12 H19" {...comum} /><path d="M13.5 6.5 L19 12 L13.5 17.5" {...comum} /></>;
      break;
    case 'coracao':
      corpo = <path d="M12 20 C 7 16.2 3.5 13 3.5 9 C 3.5 6.4 5.5 4.5 8 4.5 C 9.7 4.5 11.1 5.4 12 6.8 C 12.9 5.4 14.3 4.5 16 4.5 C 18.5 4.5 20.5 6.4 20.5 9 C 20.5 13 17 16.2 12 20 Z" fill={cor} />;
      break;
    case 'telefone':
      corpo = <path d="M6.6 3.8 L9.3 3.6 L10.9 7.7 L8.9 9.1 C 9.9 11.4 11.6 13.1 13.9 14.1 L15.3 12.1 L19.4 13.7 L19.2 16.4 C 19.1 17.8 17.9 18.9 16.5 18.8 C 9.9 18.3 4.7 13.1 4.2 6.5 C 4.1 5.1 5.2 3.9 6.6 3.8 Z" {...comum} />;
      break;
    case 'raio':
      corpo = <path d="M13 2.8 L5.5 13.2 H11.5 L10.5 21.2 L18.5 10.6 H12.6 Z" fill={cor} stroke={cor} strokeWidth={1} strokeLinejoin="round" />;
      break;
  }
  return <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>{corpo}</svg>;
};
