# Vibe Studio — imagem para Railway, Render ou qualquer servidor com Docker.
FROM node:22-bookworm-slim

# ffmpeg (áudio/vídeo), fonte de emoji e as bibliotecas que o Chrome sem tela precisa
RUN apt-get update && apt-get install -y --no-install-recommends \
      ffmpeg ca-certificates fonts-noto-color-emoji \
      libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libgbm1 libasound2 libxrandr2 \
      libxkbcommon0 libxfixes3 libxcomposite1 libxdamage1 libpango-1.0-0 libcairo2 libcups2 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

COPY . .
# app web (PWA) + Chrome do Remotion para renderizar os vídeos
RUN npx vite build && npx remotion browser ensure

ENV NODE_ENV=production \
    PORT=8080 \
    DATA_DIR=/data \
    RENDER_CONCORRENCIA=2
EXPOSE 8080
CMD ["npx", "tsx", "src/server/index.ts"]
