const { test, expect } = require('@playwright/test');

test.describe('Device Tree Architect - Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/device-tree-webapp/index.html');
    await page.waitForLoadState('domcontentloaded');
  });

  test('page loads with all essential elements', async ({ page }) => {
    // Check header
    await expect(page.locator('h1')).toContainText('Device Tree Architect');
    
    // Check warning banner is visible and pulsing
    const warningBanner = page.locator('.warning-pulse');
    await expect(warningBanner).toBeVisible();
    
    // Check main sections exist
    await expect(page.locator('.config-section').first()).toBeVisible();
    await expect(page.locator('.output-section').first()).toBeVisible();
    
    // Check footer
    await expect(page.locator('.app-footer')).toBeVisible();
  });

  test('board selector populates with boards', async ({ page }) => {
    const boardSelector = page.locator('#board-selector');
    await expect(boardSelector).toBeVisible();
    
    // Wait for boards to load
    await page.waitForTimeout(500);
    
    // Check that options exist beyond the default "Choose a board..."
    const optionCount = await boardSelector.locator('option').count();
    expect(optionCount).toBeGreaterThan(1);
  });

  test('selecting a board enables version selector', async ({ page }) => {
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    
    // Initially version selector should be disabled
    await expect(versionSelector).toBeDisabled();
    
    // Select a board (ZCU102)
    await boardSelector.selectOption({ index: 1 });
    
    // Wait for version selector to be enabled
    await page.waitForTimeout(500);
    
    // Version selector should now be enabled
    await expect(versionSelector).toBeEnabled();
    
    // Should have version options
    const versionCount = await versionSelector.locator('option').count();
    expect(versionCount).toBeGreaterThan(1);
  });

  test.skip('ZCU102 shows design template selector', async ({ page }) => {
    // SKIPPED: Design template selector feature was removed from the app
    // Keeping test for historical reference but skipping execution
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    const designSelectorGroup = page.locator('#design-selector-group');
    
    // Select ZCU102
    await boardSelector.selectOption('zcu102');
    await page.waitForTimeout(500);
    
    // Select a version
    await versionSelector.selectOption({ index: 1 });
    await page.waitForTimeout(500);
    
    // Design selector should be visible for ZCU102
    await expect(designSelectorGroup).toBeVisible();
    
    // Should have design template options
    const designSelector = page.locator('#design-selector');
    const designCount = await designSelector.locator('option').count();
    expect(designCount).toBeGreaterThan(1);
  });

  test('PS and PL configuration sections update after board selection', async ({ page }) => {
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    const psConfig = page.locator('#ps-config');
    const plConfig = page.locator('#pl-config');
    
    // Initially should show empty state
    await expect(psConfig.locator('.empty-state')).toBeVisible();
    await expect(plConfig.locator('.empty-state')).toBeVisible();
    
    // Select board and version
    await boardSelector.selectOption({ index: 1 });
    await page.waitForTimeout(500);
    await versionSelector.selectOption({ index: 1 });
    await page.waitForTimeout(1000);
    
    // Empty state should be gone (configuration loaded)
    const psEmptyState = await psConfig.locator('.empty-state').count();
    const plEmptyState = await plConfig.locator('.empty-state').count();
    
    // At least one should have configuration
    expect(psEmptyState + plEmptyState).toBeLessThan(2);
  });

  test('DTS code output updates', async ({ page }) => {
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    const dtsCode = page.locator('#dts-code');
    
    // Initial state
    await expect(dtsCode).toContainText('Select a board');
    
    // Select board and version
    await boardSelector.selectOption({ index: 1 });
    await page.waitForTimeout(500);
    await versionSelector.selectOption({ index: 1 });
    await page.waitForTimeout(1500);
    
    // DTS code should update
    const codeText = await dtsCode.textContent();
    expect(codeText).not.toContain('Select a board');
  });

  test('copy DTS button works', async ({ page, browserName }) => {
    // Clipboard API permissions only supported in Chromium
    test.skip(browserName !== 'chromium', 'Clipboard permissions not supported in ' + browserName);
    
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    const copyButton = page.locator('#copy-dts');
    
    // Select board and version to generate DTS
    await boardSelector.selectOption({ index: 1 });
    await page.waitForTimeout(500);
    await versionSelector.selectOption({ index: 1 });
    await page.waitForTimeout(1500);
    
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-write', 'clipboard-read']);
    
    // Click copy button
    await copyButton.click();
    
    // Wait for copy animation
    await page.waitForTimeout(500);
    
    // Button should show success state (temporarily)
    const buttonText = await copyButton.textContent();
    expect(buttonText).toContain('Copied' || 'Copy');
  });

  test('dark mode toggle works', async ({ page }) => {
    const darkModeToggle = page.locator('.dark-mode-toggle');
    const body = page.locator('body');
    
    // Initially should be light mode
    await expect(body).not.toHaveClass(/dark-mode/);
    
    // Click dark mode toggle
    await darkModeToggle.click();
    await page.waitForTimeout(300);
    
    // Body should have dark-mode class
    await expect(body).toHaveClass(/dark-mode/);
    
    // Toggle back to light mode
    await darkModeToggle.click();
    await page.waitForTimeout(300);
    
    await expect(body).not.toHaveClass(/dark-mode/);
  });

  test('back to tracker button exists and links correctly', async ({ page }) => {
    const backButton = page.locator('.back-to-tracker');
    
    await expect(backButton).toBeVisible();
    await expect(backButton).toHaveAttribute('href', '../../index.html');
  });

  test('Lucide icons load correctly', async ({ page }) => {
    // Wait for Lucide icons to initialize
    await page.waitForTimeout(2000);
    
    // Check that SVG icons are rendered - Lucide icons should be present
    const icons = page.locator('[data-lucide]');
    const iconCount = await icons.count();
    
    expect(iconCount).toBeGreaterThan(0);
    
    // Check that at least one icon has been replaced with SVG
    // Note: Lucide might use 'lucide-icon' class or just be an svg element
    const svgIcons = page.locator('svg[class*="lucide"], svg.lucide-icon');
    const svgCount = await svgIcons.count();
    
    // If no SVG with lucide class, check for any SVG inside [data-lucide] elements
    if (svgCount === 0) {
      const embeddedSvgs = page.locator('[data-lucide] svg');
      const embeddedCount = await embeddedSvgs.count();
      expect(embeddedCount).toBeGreaterThan(0);
    } else {
      expect(svgCount).toBeGreaterThan(0);
    }
  });

  test('warning banner has pulse animation', async ({ page }) => {
    const warningBanner = page.locator('.warning-pulse');
    
    await expect(warningBanner).toBeVisible();
    
    // Check that animation is applied
    const animation = await warningBanner.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.animation || styles.webkitAnimation;
    });
    
    expect(animation).toContain('pulse');
  });

  test('mermaid diagram container exists', async ({ page }) => {
    const diagramContainer = page.locator('#diagram-container');
    
    await expect(diagramContainer).toBeVisible();
  });

  test('form controls have proper accessibility attributes', async ({ page }) => {
    const boardSelector = page.locator('#board-selector');
    const versionSelector = page.locator('#version-selector');
    const darkModeToggle = page.locator('.dark-mode-toggle');
    const backButton = page.locator('.back-to-tracker');
    
    // Check ARIA labels
    await expect(darkModeToggle).toHaveAttribute('aria-label', 'Toggle dark mode');
    await expect(backButton).toHaveAttribute('aria-label', 'Return to main tracker page');
    
    // Check that selects have proper IDs matching their labels
    const boardLabel = page.locator('label[for="board-selector"]');
    const versionLabel = page.locator('label[for="version-selector"]');
    
    await expect(boardLabel).toBeVisible();
    await expect(versionLabel).toBeVisible();
  });

  test('mobile: touch targets are 44px minimum', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    // Check key interactive elements
    const darkModeToggle = page.locator('.dark-mode-toggle');
    const copyButton = page.locator('#copy-dts');
    const boardSelector = page.locator('#board-selector');
    
    const elements = [darkModeToggle, copyButton, boardSelector];
    
    for (const element of elements) {
      const box = await element.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/pages/device-tree-webapp/index.html');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    expect(consoleErrors.length).toBe(0);
  });

  test('page is responsive on different viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Check no horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      
      expect(overflow).toBeLessThan(5);
    }
  });
});
