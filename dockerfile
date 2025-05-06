# ---------- 1. Base image ----------
    FROM node:18-bullseye-slim

    # ---------- 2. Install system deps & headless Chromium ----------
    RUN apt-get update && \
        apt-get install -y \
          chromium chromium-driver \
          libatk-1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxdamage1 \
          libxkbcommon0 libxcomposite1 libxrandr2 libgbm1 libasound2 \
          libpangocairo-1.0-0 libgtk-3-0 libnss3 libxshmfence1 fonts-liberation && \
        rm -rf /var/lib/apt/lists/*
    
    ENV PUPPETEER_SKIP_DOWNLOAD=true           
    
    # ---------- 3. App setup ----------
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --omit=dev
    COPY . .
    
    # Make sure the path matches the one you used in the JS snippet
    ENV CHROME_BIN=/usr/bin/chromium-browser
    
    # ---------- 4. Launch bot ----------
    CMD ["node", "index.js"]
    