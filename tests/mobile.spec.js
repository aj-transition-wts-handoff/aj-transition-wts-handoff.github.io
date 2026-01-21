const { test, expect, devices } = require('@playwright/test');

const pages = [
  '/index.html',
  '/pages/jenkins-automation.html',
  '/pages/playbook.html',
  '/pages/ethernet-interfaces.html',
  '/pages/device-tree-webapp/index.html',
  '/pages/boardfarm-resources/boardfarm.html'
];

// Skip entire mobile test file on webkit - Pixel 5 device requires chromium
test.skip(({ browserName }) => browserName === 'webkit', 'Pixel 5 device requires chromium browser');

// Use Pixel 5 (chromium) as default device since webkit has compatibility issues
const deviceName = process.env.DEVICE || 'Pixel 5';
test.use(devices[deviceName]);

test.describe('Mobile Responsiveness', () => {
  for (const page of pages) {
    test(`${page} is responsive on ${deviceName}`, async ({ page: playwright }) => {
      await playwright.goto(page);
      
      const body = playwright.locator('body');
      await expect(body).toBeVisible();
      
      const overflow = await playwright.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      expect(overflow).toBeLessThan(5);
    });
  }
});

test.describe('Orientation Changes', () => {
  test('handles portrait to landscape transition', async ({ page, browser, browserName }) => {
    // Skip on Firefox due to rendering inconsistencies
    if (browserName === 'firefox') {
      test.skip();
    }
    
    const context = await browser.newContext({
      ...devices['Pixel 5']
    });
    const newPage = await context.newPage();
    
    // Portrait
    await newPage.goto('/index.html');
    await expect(newPage.locator('body')).toBeVisible();
    
    // Switch to landscape
    await newPage.setViewportSize({ width: 844, height: 390 });
    await newPage.waitForTimeout(500);
    
    // Check if layout adjusted
    await expect(newPage.locator('body')).toBeVisible();
    
    await context.close();
  });
});
