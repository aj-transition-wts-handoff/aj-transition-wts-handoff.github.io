const { test, expect } = require('@playwright/test');

const pages = [
  { url: '/index.html', name: 'index' },
  { url: '/pages/jenkins-automation.html', name: 'jenkins-automation' },
  { url: '/pages/playbook.html', name: 'playbook' },
  { url: '/pages/ethernet-interfaces.html', name: 'ethernet-interfaces' }
];

test.describe('Visual Regression Testing', () => {
  for (const { url, name } of pages) {
    test(`${name} - desktop light mode`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      // Extra wait for dynamic content
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot(`${name}-desktop-light.png`, {
        fullPage: true,
        maxDiffPixels: 500,
        timeout: 15000,
        animations: 'disabled'
      });
    });

    test(`${name} - desktop dark mode`, async ({ page }) => {
      await page.goto(url);
      
      // Enable dark mode
      const darkModeToggle = page.locator('.dark-mode-toggle');
      if (await darkModeToggle.count() > 0) {
        await darkModeToggle.click();
        await page.waitForTimeout(2000);
        
        await expect(page).toHaveScreenshot(`${name}-desktop-dark.png`, {
          fullPage: true,
          maxDiffPixels: 500,
          timeout: 15000,
          animations: 'disabled'
        });
      }
    });

    test(`${name} - mobile viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      // Extra wait for dynamic content
      await page.waitForTimeout(2000);
      
      await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
        fullPage: true,
        maxDiffPixels: 500,
        timeout: 15000,
        animations: 'disabled'
      });
    });

    test(`${name} - tablet viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      // Extra wait for dynamic content
      await page.waitForTimeout(2000);
      
      await expect(page).toHaveScreenshot(`${name}-tablet.png`, {
        fullPage: true,
        maxDiffPixels: 500,
        timeout: 15000,
        animations: 'disabled'
      });
    });
  }
});

test.describe('Component-Specific Visual Tests', () => {
  test('slideshow component - jenkins page', async ({ page }) => {
    await page.goto('/pages/jenkins-automation.html');
    await page.waitForLoadState('networkidle');
    
    const slideshow = page.locator('#slideshow-container');
    if (await slideshow.count() > 0) {
      await expect(slideshow).toHaveScreenshot('slideshow-component.png', {
        maxDiffPixels: 50
      });
    }
  });

  test('navigation bar', async ({ page }) => {
    await page.goto('/index.html');
    const nav = page.locator('nav').first();
    
    if (await nav.count() > 0) {
      await expect(nav).toHaveScreenshot('navigation-bar.png', {
        maxDiffPixels: 50
      });
    }
  });

  test('dark mode toggle button', async ({ page }) => {
    await page.goto('/index.html');
    const toggle = page.locator('.dark-mode-toggle');
    
    if (await toggle.count() > 0) {
      await expect(toggle).toHaveScreenshot('dark-mode-toggle.png', {
        maxDiffPixels: 20
      });
    }
  });
});
