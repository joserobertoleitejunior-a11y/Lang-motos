import React, { useEffect, useState } from 'react';
import { cancelRender, continueRender, delayRender, staticFile } from 'remotion';
import { loadFont } from '@remotion/fonts';
import { ARQUIVOS_FONTES } from './tema';

let promessa: Promise<unknown> | null = null;
function carregarTodas() {
  if (!promessa) {
    promessa = Promise.all(
      ARQUIVOS_FONTES.map((f) => loadFont({ family: f.family, url: staticFile(`fontes/${f.arquivo}`), weight: f.weight, style: f.style ?? 'normal' })),
    );
  }
  return promessa;
}

/**
 * Só desenha o vídeo depois que todas as fontes carregaram: a medição de
 * texto (quebra de linha automática) precisa da fonte certa.
 */
export const Fontes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pronto, setPronto] = useState(false);
  const [handle] = useState(() => delayRender('Carregando fontes'));
  useEffect(() => {
    carregarTodas()
      .then(() => document.fonts.ready)
      .then(() => {
        setPronto(true);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [handle]);
  return pronto ? <>{children}</> : null;
};
