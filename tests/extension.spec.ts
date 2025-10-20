import { test, expect, type BrowserContext } from '@playwright/test';

async function getExtensionId(context: BrowserContext): Promise<string> {
  const serviceWorkers = context.serviceWorkers();
  if (serviceWorkers.length === 0) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const sws = context.serviceWorkers();
    if (sws.length > 0) {
      return new URL(sws[0].url()).hostname;
    }
    throw new Error('Não foi possível encontrar o Service Worker da extensão.');
  }
  
  const sw = serviceWorkers[0];
  const swUrl = sw.url(); 
  return new URL(swUrl).hostname;
}

test.describe('Testes E2E da Extensão Pomodoro', () => {
  let extensionId: string;

  test.beforeEach(async ({ context }) => {
    extensionId = await getExtensionId(context);
    expect(extensionId).toBeTruthy();
  });

  test('Deve carregar o popup e exibir o estado inicial', async ({ page }) => {
    await page.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    await expect(page).toHaveTitle('Focus Pomodoro');
    await expect(page.locator('#timer-display')).toHaveText('25:00');
    const startButton = page.locator('#start-button');
    await expect(startButton).toBeVisible();
    await expect(startButton).toHaveText('Start');
  });

  test('Deve alterar o texto do botão "Start" para "Stop" ao clicar', async ({ page }) => {
    await page.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    const startButton = page.locator('#start-button');
    await startButton.click();
    await expect(startButton).toHaveText('Stop');
  });

  test('Deve injetar o content script em example.com', async ({ page }) => {
    await page.goto('https://example.com');
    const link = page.locator('a').first();
    await expect(link).toHaveCSS('border', '2px solid rgb(255, 0, 0)');
  });
});