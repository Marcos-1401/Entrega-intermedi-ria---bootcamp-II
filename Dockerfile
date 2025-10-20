# Base Playwright (Chromium já incluído)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /app

# 1. Instalar dependências do NPM
COPY package*.json ./
RUN npm ci --silent

# 2. Instalar navegadores (garante o Chromium, mesmo que a base já tenha)
RUN npx playwright install --with-deps chromium

# 3. Copiar o restante do código
COPY . .

# 4. Build da extensão para dist/
# O script 'build' já está no package.json (node scripts/build-extension.mjs)
RUN npm run build

# 5. Comando padrão para rodar os testes
# Usamos 'npm test' que (conforme package.json) roda 'build' e 'test:e2e'
CMD ["npm", "test"]
