const { test, expect, devices } = require('@playwright/test');

const pages = [
  '/index.html',
  '/pages/jenkins-automation.html',
  '/pages/playbook.html',
  '/pages/ethernet-interfaces.html'
];

// Create tests for iPhone 12
test.describe('Mobile Responsiveness on iPhone 12', () => {
  test.use(devices['iPhone 12']);

  for (const page of pages) {
    test(`${page} is responsive`, async ({ page: playwright }) => {
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

// Create tests for Pixel 5
test.describe('Mobile Responsiveness on Pixel 5', () => {
  test.use(devices['Pixel 5']);

  for (const page of pages) {
    test(`${page} is responsive`, async ({ page: playwright }) => {
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

// Create tests for iPad Pro
test.describe('Mobile Responsiveness on iPad Pro', () => {
  test.use(devices['iPad Pro']);

  for (const page of pages) {
    test(`${page} is responsive`, async ({ page: playwright }) => {
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
  test('handles portrait to landscape transition', async ({ page, browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12']
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
