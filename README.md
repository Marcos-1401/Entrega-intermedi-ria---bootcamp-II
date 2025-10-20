# Extensão Pomodoro (Bootcamp - Entrega Intermediária)

Este repositório contém o projeto de exemplo para a atividade de "Containerização (Docker Compose) + CI (GitHub Actions)".

O objetivo é implementar uma extensão do Chrome (Manifest V3), empacotá-la e executar testes end-to-end com Playwright em um ambiente containerizado, automatizando todo o processo com GitHub Actions.

## Funcionalidades da Extensão

* Implementa um timer Pomodoro básico (25 minutos).
* Utiliza as APIs do Chrome: `storage` (salvar estado), `alarms` (agendar o fim do timer) e `notifications` (avisar o usuário).
* Inclui um *content script* que é injetado em `example.com` para fins de teste.

## Pipeline de Integração Contínua (CI)

A pipeline de CI está configurada em `.github/workflows/ci.yml` e executa as seguintes etapas em cada *push* ou *pull request* para a branch `main`:

1.  **Checkout:** Baixa o código do repositório.
2.  **Setup:** Configura o ambiente Node.js (versão 20).
3.  **Install:** Instala as dependências do `package.json` (npm ci) e os navegadores do Playwright (Chromium).
4.  **Build:** Executa o script `npm run build` (que usa `scripts/build-extension.mjs`) para criar a pasta `dist/` e o pacote `dist/extension.zip`.
5.  **Test:** Executa a suíte de testes E2E com `npm run test:e2e`.
6.  **Upload Artifacts:**
    * Publica o `playwright-report/` (mesmo se os testes falharem).
    * Publica o `dist/extension.zip` (apenas se os testes passarem).

## Execução Local (Docker)

Para garantir um ambiente de teste consistente e reprodutível, o projeto utiliza Docker e Docker Compose.

**Requisitos:**
* Docker
* Docker Compose

### 1. Construir a Imagem

O `Dockerfile` usa a imagem base do Playwright (`mcr.microsoft.com/playwright`) para garantir que o Chromium e suas dependências estejam presentes.

```bash
docker compose build
2. Executar os Testes E2E
O docker-compose.yml está configurado para executar os testes. Ele monta o volume necessário e aloca shm_size suficiente para o Chromium.

Bash

docker compose run --rm e2e
Este comando irá iniciar o container, executar o npm test (que por sua vez roda build e test:e2e) e exibir a saída no terminal.

Instalação Manual da Extensão
Para testar a extensão manualmente no seu navegador:

Execute o build localmente:

Bash

npm install
npm run build
Abra o Google Chrome e navegue até chrome://extensions.

Ative o "Modo de Desenvolvedor" (Developer mode).

Clique em "Carregar sem compactação" (Load unpacked).

Selecione a pasta dist/ gerada no passo 1.
