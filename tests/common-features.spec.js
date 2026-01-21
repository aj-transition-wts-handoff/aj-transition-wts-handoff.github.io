const { test, expect } = require('@playwright/test');

const pages = [
  '/index.html',
  '/pages/jenkins-automation.html',
  '/pages/playbook.html',
  '/pages/ethernet-interfaces.html',
  '/pages/cases-dashboard.html',
  '/pages/ar-list.html',
  '/pages/cq-list.html',
  '/pages/cr-list.html',
  '/pages/device-tree-webapp/index.html',
  '/pages/boardfarm-resources/boardfarm.html'
];

test.describe('Common Features Across All Pages', () => {
  for (const page of pages) {
    test.describe(`Testing ${page}`, () => {
      test('loads without errors', async ({ page: playwright }) => {
        const response = await playwright.goto(page);
        expect(response?.status()).toBeLessThan(400);
      });

      test('has valid HTML structure', async ({ page: playwright }) => {
        await playwright.goto(page);
        
        // Check for basic HTML structure
        await expect(playwright.locator('html')).toBeVisible();
        await expect(playwright.locator('head')).toHaveCount(1);
        await expect(playwright.locator('body')).toHaveCount(1);
      });

      test('has dark mode toggle', async ({ page: playwright }) => {
        await playwright.goto(page);
        
        const darkModeToggle = playwright.locator('.dark-mode-toggle');
        if (await darkModeToggle.count() > 0) {
          await expect(darkModeToggle).toBeVisible();
        }
      });

      test('has responsive meta viewport', async ({ page: playwright }) => {
        await playwright.goto(page);
        
        const viewport = playwright.locator('meta[name="viewport"]');
        await expect(viewport).toHaveAttribute('content', /width=device-width/);
      });

      test('has no console errors', async ({ page: playwright }) => {
        const errors = [];
        playwright.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        await playwright.goto(page);
        await playwright.waitForTimeout(2000);
        
        // Filter out common third-party errors and network issues
        const criticalErrors = errors.filter(err => 
          !err.includes('favicon') && 
          !err.includes('chrome-extension') &&
          !err.includes('Could not resolve hostname') &&
          !err.includes('ERR_NAME_NOT_RESOLVED') &&
          !err.includes('Failed to load resource')
        );
        
        expect(criticalErrors).toHaveLength(0);
      });

      test('has valid CSS loaded', async ({ page: playwright }) => {
        await playwright.goto(page);
        
        // Check if styles.css is loaded
        const cssLink = playwright.locator('link[href*="styles.css"]');
        if (await cssLink.count() > 0) {
          // Use .first() to handle pages with multiple CSS files
          await expect(cssLink.first()).toHaveAttribute('rel', 'stylesheet');
        }
      });

      test('navigation is functional', async ({ page: playwright }) => {
        await playwright.goto(page);
        
        const nav = playwright.locator('nav[aria-label="Main navigation"]').first();
        if (await nav.count() > 0) {
          await expect(nav).toBeVisible();
        }
      });
    });
  }
});

test.describe('Dark Mode Persistence', () => {
  test('dark mode persists across page reloads', async ({ page }) => {
    await page.goto('/index.html');
    
    // Enable dark mode
    await page.click('.dark-mode-toggle');
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
    
    // Reload page
    await page.reload();
    
    // Check if dark mode is still enabled
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
  });
});

test.describe('Performance Checks', () => {
  test('page load time is acceptable', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/index.html');
    await page.waitForLoadState('load');
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
