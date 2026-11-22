"""Gera a biblioteca de efeitos sonoros e as músicas de base do Vibe Studio.

Tudo é sintetizado aqui (sem amostras de terceiros), então pode ser usado sem
preocupação com direitos autorais. As músicas são trilhas simples de apoio;
para trilhas de alta qualidade o app usa uma API de música quando configurada.

Uso: python3 scripts/gerar_audio.py   (gera em public/sfx e public/musica)
"""
import os, subprocess, wave
import numpy as np

SR = 44100
RNG = np.random.default_rng(7)
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")


def t(dur):
    return np.arange(int(dur * SR)) / SR


def env(n, a=0.005, d=0.1, s=0.0, r=0.05, sus=None):
    """Envelope ADSR simples (em segundos) para um sinal de n amostras."""
    e = np.zeros(n)
    na, nd, nr = int(a * SR), int(d * SR), int(r * SR)
    na = max(na, 1)
    e[:na] = np.linspace(0, 1, na)
    fim_d = min(n, na + nd)
    if fim_d > na:
        e[na:fim_d] = np.linspace(1, s, fim_d - na)
    ini_r = max(fim_d, n - nr)
    e[fim_d:ini_r] = s
    if n - ini_r > 0:
        e[ini_r:] = np.linspace(e[ini_r - 1] if ini_r > 0 else s, 0, n - ini_r)
    return e


def exp_decay(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def fir_lowpass(cut, taps=101):
    cut = min(max(cut, 20), SR / 2 - 100) / SR
    m = np.arange(taps) - (taps - 1) / 2
    h = np.sinc(2 * cut * m) * np.hamming(taps)
    return h / h.sum()


def lowpass(x, cut, taps=101):
    return np.convolve(x, fir_lowpass(cut, taps), mode="same")


def highpass(x, cut, taps=101):
    return x - lowpass(x, cut, taps)


def bandsweep(x, f0, f1, chunk=512):
    """Filtro passa-faixa que varre de f0 a f1 ao longo do sinal (whoosh)."""
    out = np.zeros_like(x)
    n = len(x)
    for i in range(0, n, chunk):
        frac = i / max(n - 1, 1)
        fc = f0 * (f1 / f0) ** frac
        seg = x[max(0, i - 128): min(n, i + chunk + 128)]
        y = lowpass(seg, fc * 1.6, 63) - lowpass(seg, fc * 0.6, 63)
        a = i - max(0, i - 128)
        out[i:i + chunk] = y[a:a + min(chunk, n - i)]
    return out


def normalizar(x, pico=0.89):
    m = np.max(np.abs(x)) or 1.0
    return x * (pico / m)


def estereo(mono, pan=0.0):
    """pan -1 (esquerda) a 1 (direita); pode ser um array (pan variável)."""
    pan = np.broadcast_to(pan, mono.shape)
    l = mono * np.cos((pan + 1) * np.pi / 4)
    r = mono * np.sin((pan + 1) * np.pi / 4)
    return np.stack([l, r], axis=1)


def salvar_wav(caminho, sinal):
    if sinal.ndim == 1:
        sinal = estereo(sinal)
    dados = (np.clip(sinal, -1, 1) * 32767).astype(np.int16)
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with wave.open(caminho, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(dados.tobytes())


# ----------------------------------------------------------------- efeitos sonoros
def sfx_pop():
    n = int(0.16 * SR)
    tt = np.arange(n) / SR
    f = 220 + 520 * np.exp(-tt / 0.018)
    fase = 2 * np.pi * np.cumsum(f) / SR
    corpo = np.sin(fase) * exp_decay(n, 0.045)
    clique = lowpass(RNG.standard_normal(n), 4000) * exp_decay(n, 0.004) * 0.5
    return normalizar(corpo + clique, 0.8)


def sfx_whoosh(dur=0.5, f0=350, f1=3200):
    n = int(dur * SR)
    ruido = RNG.standard_normal(n)
    x = bandsweep(ruido, f0, f1)
    forma = np.sin(np.linspace(0, np.pi, n)) ** 1.6
    pan = np.linspace(-0.7, 0.7, n)
    return estereo(normalizar(x * forma, 0.7), pan)


def sfx_subida():
    n = int(0.42 * SR)
    tt = np.arange(n) / SR
    f = 260 * (1300 / 260) ** (tt / tt[-1])
    tom = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.35
    ruido = bandsweep(RNG.standard_normal(n), 500, 5000) * 0.8
    forma = np.linspace(0, 1, n) ** 1.5 * env(n, 0.01, 0.0, 1.0, 0.06)
    return normalizar((tom + ruido) * forma, 0.7)


def sino(f0, dur=1.4, brilho=1.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    parciais = [(1, 1.0, 0.9), (2.76, 0.5 * brilho, 0.45), (5.4, 0.25 * brilho, 0.25), (8.93, 0.12 * brilho, 0.12)]
    x = sum(a * np.sin(2 * np.pi * f0 * m * tt) * np.exp(-tt / tau) for m, a, tau in parciais)
    x *= env(n, 0.002, 0.0, 1.0, 0.02)
    return x


def sfx_ding():
    return normalizar(sino(1318.5), 0.75)


def sfx_sucesso():
    a = sino(1046.5, 0.9)
    b = sino(1567.98, 1.3)
    out = np.zeros(int(1.5 * SR))
    out[: len(a)] += a
    off = int(0.12 * SR)
    out[off: off + len(b)] += b
    return normalizar(out, 0.75)


def sfx_clique():
    n = int(0.05 * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * 2100 * tt) * exp_decay(n, 0.006) + highpass(RNG.standard_normal(n), 2500) * exp_decay(n, 0.002) * 0.6
    return normalizar(x, 0.6)


def sfx_impacto():
    n = int(0.9 * SR)
    tt = np.arange(n) / SR
    f = 42 + 70 * np.exp(-tt / 0.08)
    grave = np.sin(2 * np.pi * np.cumsum(f) / SR) * exp_decay(n, 0.28)
    soco = lowpass(RNG.standard_normal(n), 1800) * exp_decay(n, 0.03)
    x = np.tanh((grave * 1.3 + soco * 0.7) * 1.8)
    return normalizar(x, 0.85)


def sfx_brilho():
    n = int(0.7 * SR)
    out = np.zeros(n)
    for i in range(7):
        ini = int(RNG.uniform(0, 0.4) * SR)
        f = RNG.uniform(2500, 6000)
        m = int(0.25 * SR)
        tt = np.arange(m) / SR
        p = np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.05) * RNG.uniform(0.4, 1)
        out[ini: ini + m] += p[: n - ini]
    return normalizar(out, 0.55)


def sfx_digitar():
    n = int(0.9 * SR)
    out = np.zeros(n)
    tempos = np.cumsum(RNG.uniform(0.07, 0.13, 9))
    for tc in tempos:
        i = int(tc * SR)
        if i >= n:
            break
        c = sfx_clique() * RNG.uniform(0.5, 1.0)
        m = min(len(c), n - i)
        out[i: i + m] += c[:m]
    return normalizar(out, 0.55)


def sfx_transicao():
    w = sfx_whoosh(0.38, 250, 2400)
    return w


# ----------------------------------------------------------------- música
NOTAS = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}


def freq(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def acorde(nome, oitava=4):
    """'Cmaj7', 'Am', 'G', 'F#m7'... -> lista de notas MIDI."""
    raiz = nome[0] + ("#" if len(nome) > 1 and nome[1] == "#" else "")
    resto = nome[len(raiz):]
    base = 12 * (oitava + 1) + NOTAS[raiz]
    if resto.startswith("m") and not resto.startswith("maj"):
        tri = [0, 3, 7]
        resto = resto[1:]
    else:
        tri = [0, 4, 7]
    if resto == "7":
        tri.append(10)
    elif resto == "maj7":
        tri.append(11)
    elif resto == "add9":
        tri.append(14)
    return [base + i for i in tri]


def tom_piano(f, dur, vel=0.6):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = (np.sin(2 * np.pi * f * tt) + 0.45 * np.sin(4 * np.pi * f * tt) * np.exp(-tt / 0.25)
         + 0.2 * np.sin(6 * np.pi * f * tt) * np.exp(-tt / 0.15))
    x *= np.exp(-tt / (0.9 + 200 / f)) * env(n, 0.004, 0.0, 1.0, 0.08)
    return x * vel


def tom_pluck(f, dur, vel=0.5, corte=2600):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    saw = 2 * ((f * tt) % 1.0) - 1
    x = lowpass(saw, corte, 63) * np.exp(-tt / 0.22) * env(n, 0.003, 0.0, 1.0, 0.05)
    return x * vel


def tom_pad(f, dur, vel=0.25):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 1.003 * tt) + 0.3 * (2 * np.abs(2 * ((f * 0.5 * tt) % 1) - 1) - 1)
    return x * env(n, 0.35, 0.0, 1.0, 0.4) * vel


def tom_baixo(f, dur, vel=0.6):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)
    return np.tanh(x * 1.4) * env(n, 0.005, 0.05, 0.8, 0.04) * vel


def bumbo(vel=0.9):
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    f = 48 + 110 * np.exp(-tt / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.12) * vel


def caixa(vel=0.5):
    n = int(0.22 * SR)
    tt = np.arange(n) / SR
    ruido = highpass(RNG.standard_normal(n), 1200) * np.exp(-tt / 0.06)
    corpo = np.sin(2 * np.pi * 190 * tt) * np.exp(-tt / 0.04) * 0.5
    return (ruido * 0.7 + corpo) * vel


def chimbal(vel=0.18, aberto=False):
    n = int((0.18 if aberto else 0.05) * SR)
    tt = np.arange(n) / SR
    return highpass(RNG.standard_normal(n), 7000) * np.exp(-tt / (0.06 if aberto else 0.012)) * vel


def chocalho(vel=0.08):
    n = int(0.09 * SR)
    tt = np.arange(n) / SR
    return highpass(RNG.standard_normal(n), 5000) * np.sin(np.pi * tt / tt[-1]) * vel


def mix_em(buf, x, ini):
    i = int(ini * SR)
    if i >= len(buf):
        return
    m = min(len(x), len(buf) - i)
    buf[i:i + m] += x[:m]


def musica(nome, bpm, progressao, compassos_por_acorde, estilo, repeticoes=2):
    batida = 60.0 / bpm
    compasso = 4 * batida
    total_compassos = len(progressao) * compassos_por_acorde * repeticoes
    dur = total_compassos * compasso
    n = int(dur * SR) + SR
    melodia = np.zeros(n)
    harmonia = np.zeros(n)
    graves = np.zeros(n)
    bateria = np.zeros(n)
    c = 0
    for rep in range(repeticoes):
        for nome_ac in progressao:
            notas = acorde(nome_ac, 4)
            raiz = notas[0] - 24
            for k in range(compassos_por_acorde):
                ini = c * compasso
                if estilo in ("alegre", "energetico"):
                    for b8 in range(8):
                        tb = ini + b8 * batida / 2
                        if estilo == "alegre" and b8 % 2 == 0:
                            for nt in notas:
                                mix_em(harmonia, tom_pluck(freq(nt), batida * 0.9, 0.16), tb)
                        if estilo == "energetico" and b8 % 2 == 1:
                            for nt in notas:
                                mix_em(harmonia, tom_pluck(freq(nt + 12), batida * 0.45, 0.10, 3800), tb)
                        mix_em(graves, tom_baixo(freq(raiz), batida * 0.45, 0.32), tb)
                        mix_em(bateria, chimbal(0.10 if b8 % 2 == 0 else 0.07), tb)
                    for b4 in range(4):
                        tb = ini + b4 * batida
                        if estilo == "energetico" or b4 in (0, 2):
                            mix_em(bateria, bumbo(0.8), tb)
                        if b4 in (1, 3):
                            mix_em(bateria, caixa(0.32), tb)
                    arp = [notas[0] + 12, notas[1] + 12, notas[2] + 12, notas[1] + 12]
                    for i, nt in enumerate(arp):
                        mix_em(melodia, tom_piano(freq(nt), batida * 1.2, 0.10), ini + i * batida)
                elif estilo == "tranquilo":
                    for nt in notas:
                        mix_em(harmonia, tom_pad(freq(nt), compasso * 1.05, 0.09), ini)
                    mix_em(graves, tom_baixo(freq(raiz), compasso * 0.95, 0.22), ini)
                    arp = notas + [notas[1] + 12]
                    for i in range(8):
                        nt = arp[i % len(arp)] + 12
                        mix_em(melodia, tom_piano(freq(nt), batida * 1.5, 0.09), ini + i * batida / 2)
                    for b8 in range(8):
                        mix_em(bateria, chocalho(0.05 if b8 % 2 else 0.07), ini + b8 * batida / 2)
                elif estilo == "elegante":
                    for nt in notas:
                        mix_em(harmonia, tom_pad(freq(nt - 12), compasso * 1.05, 0.07), ini)
                    seq = [notas[0], notas[2], notas[1] + 12, notas[2], notas[0] + 12, notas[2], notas[1] + 12, notas[2]]
                    for i, nt in enumerate(seq):
                        mix_em(melodia, tom_piano(freq(nt + 12), batida * 1.8, 0.11), ini + i * batida / 2)
                    mix_em(graves, tom_piano(freq(raiz + 12), compasso, 0.18), ini)
                c += 1
    mix = melodia * 0.9 + harmonia * 0.8 + graves * 0.85 + bateria * 0.9
    mix = lowpass(mix, 12000, 31)
    alvo = int(dur * SR)
    mix = mix[:alvo]
    # micro fades para o laço não estalar
    f = int(0.01 * SR)
    mix[:f] *= np.linspace(0, 1, f)
    mix[-f:] *= np.linspace(1, 0, f)
    mix = np.tanh(normalizar(mix, 0.95) * 1.15) * 0.82
    larg = 0.12 * np.sin(2 * np.pi * np.arange(alvo) / SR * 0.15)
    return estereo(mix, larg), dur


def main():
    sfx = {
        "pop": sfx_pop(), "whoosh": sfx_whoosh(), "subida": sfx_subida(), "ding": sfx_ding(),
        "sucesso": sfx_sucesso(), "clique": sfx_clique(), "impacto": sfx_impacto(), "brilho": sfx_brilho(),
        "digitar": sfx_digitar(), "transicao": sfx_transicao(),
    }
    for nome, sinal in sfx.items():
        salvar_wav(os.path.join(RAIZ, "sfx", f"{nome}.wav"), sinal)
    faixas = {
        "alegre": (112, ["C", "G", "Am", "F"], 1, "alegre", 4),
        "tranquilo": (78, ["Fmaj7", "Em7", "Dm7", "Cmaj7"], 1, "tranquilo", 3),
        "energetico": (124, ["Am", "F", "C", "G"], 1, "energetico", 4),
        "elegante": (88, ["Dmaj7", "Bm7", "Gmaj7", "A"], 1, "elegante", 3),
    }
    for nome, (bpm, prog, cpa, estilo, rep) in faixas.items():
        sinal, dur = musica(nome, bpm, prog, cpa, estilo, rep)
        wav = os.path.join(RAIZ, "musica", f"{nome}.wav")
        salvar_wav(wav, sinal)
        mp3 = wav[:-4] + ".mp3"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-b:a", "128k", mp3], check=True)
        os.remove(wav)
        print(f"musica {nome}: {dur:.1f}s")
    print("ok")


if __name__ == "__main__":
    main()
