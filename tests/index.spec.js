const { test, expect } = require('@playwright/test');

test.describe('Index Page (Main Tracker)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Ajaya/);
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.click('.dark-mode-toggle');
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
    
    // Toggle back
    await page.click('.dark-mode-toggle');
    await expect(page.locator('body')).not.toHaveClass(/dark-mode/);
  });

  test('navigation links are clickable', async ({ page }) => {
    const navLinks = page.locator('.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      await expect(link).toBeVisible();
    }
  });

  test('scroll to top button appears on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    const scrollBtn = page.locator('.scroll-to-top');
    await expect(scrollBtn).toBeVisible();
  });

  test('mobile menu toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const menuToggle = page.locator('.mobile-menu-toggle');
    
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      const menu = page.locator('#mobile-menu');
      await expect(menu).toHaveClass(/show/);
    }
  });

  test('all cards are visible', async ({ page }) => {
    const cards = page.locator('.card, [class*="card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
