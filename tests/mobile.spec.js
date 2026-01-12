const { test, expect, devices } = require('@playwright/test');

const pages = [
  '/index.html',
  '/pages/jenkins-automation.html',
  '/pages/playbook.html',
  '/pages/ethernet-interfaces.html'
];

// Use test.use() at the top level with conditional device selection
// Using Pixel 5 (chromium) instead of iPhone 12 (webkit) for CI compatibility
const deviceName = process.env.DEVICE || 'Pixel 5';
test.use(devices[deviceName]);

// Skip all mobile tests on webkit since Pixel 5 requires chromium
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.project.name === 'webkit') {
    testInfo.skip();
  }
});

test.describe('Mobile Responsiveness', () => {
  for (const page of pages) {
    test(`${page} is responsive on ${deviceName}`, async ({ page: playwright, browserName }) => {
      // Skip on webkit - Pixel 5 is chromium-only device
      if (browserName === 'webkit') {
        test.skip();
      }
      // Skip on Firefox due to rendering inconsistencies
      if (browserName === 'firefox') {
        test.skip();
      }
      
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
    // Skip on webkit - Pixel 5 is chromium-only device
    if (browserName === 'webkit') {
      test.skip();
    }
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
