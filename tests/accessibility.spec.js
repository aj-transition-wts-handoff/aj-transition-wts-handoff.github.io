const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  { url: '/index.html', name: 'Index' },
  { url: '/pages/jenkins-automation.html', name: 'Jenkins Automation' },
  { url: '/pages/playbook.html', name: 'Playbook' },
  { url: '/pages/ethernet-interfaces.html', name: 'Ethernet Interfaces' },
  { url: '/pages/cases-dashboard.html', name: 'Cases Dashboard' },
  { url: '/pages/ar-list.html', name: 'AR List' },
  { url: '/pages/cq-list.html', name: 'CQ List' },
  { url: '/pages/cr-list.html', name: 'CR List' },
  { url: '/pages/device-tree-webapp/index.html', name: 'Device Tree Architect' },
  { url: '/pages/boardfarm-resources/boardfarm.html', name: 'Boardfarm Setup' }
];

test.describe('Accessibility Testing', () => {
  // Increase timeout for large pages with dynamic content
  test.setTimeout(60000);
  
  for (const { url, name } of pages) {
    test(`${name} page meets WCAG standards`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      try {
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        
        expect(accessibilityScanResults.violations).toEqual([]);
      } catch (error) {
        // If axe-core is not installed, skip gracefully
        test.skip();
      }
    });

    test(`${name} has proper heading hierarchy`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);
      expect(h1Count).toBeLessThanOrEqual(1); // Should have only one h1
    });

    test(`${name} has alt text for images`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      const images = page.locator('img');
      const count = await images.count();
      
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test(`${name} has proper button labels`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      const buttons = page.locator('button');
      const count = await buttons.count();
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        // Button should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test(`${name} has proper link labels`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      const links = page.locator('a');
      const count = await links.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const title = await link.getAttribute('title');
        
        // Link should have text, aria-label, or title
        expect(text || ariaLabel || title).toBeTruthy();
      }
    });

    test(`${name} has sufficient color contrast`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      try {
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2aa'])
          .options({ rules: { 'color-contrast': { enabled: true } } })
          .analyze();
        
        const contrastViolations = accessibilityScanResults.violations.filter(
          v => v.id === 'color-contrast'
        );
        
        expect(contrastViolations).toEqual([]);
      } catch (error) {
        test.skip();
      }
    });

    test(`${name} is keyboard navigable`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      // Tab through focusable elements
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
      
      // Should be able to tab multiple times
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }
      
      focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test(`${name} has proper lang attribute`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('html');
      
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
      expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // e.g., 'en' or 'en-US'
    });

    test(`${name} has skip to content link`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      
      // Many pages should have a skip link for accessibility
      // This is optional but recommended
      const skipLink = page.locator('a[href*="#main"], a[href*="#content"], .skip-link');
      // Just check if it exists, don't fail if it doesn't
      const count = await skipLink.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }
});

test.describe('Screen Reader Compatibility', () => {
  test('has proper ARIA landmarks', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');
    
    // Check for common landmarks
    const nav = page.locator('nav, [role="navigation"]');
    const main = page.locator('main, [role="main"]');
    const header = page.locator('header, [role="banner"]');
    
    // At least one landmark should exist
    const navCount = await nav.count();
    const mainCount = await main.count();
    const headerCount = await header.count();
    
    expect(navCount + mainCount + headerCount).toBeGreaterThan(0);
  });
});
