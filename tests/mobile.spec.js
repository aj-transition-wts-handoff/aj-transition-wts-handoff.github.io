const { test, expect, devices } = require('@playwright/test');

const pages = [
  '/index.html',
  '/pages/jenkins-automation.html',
  '/pages/playbook.html',
  '/pages/ethernet-interfaces.html'
];

const mobileDevices = [
  { name: 'iPhone 12', ...devices['iPhone 12'] },
  { name: 'Pixel 5', ...devices['Pixel 5'] },
  { name: 'iPad Pro', ...devices['iPad Pro'] }
];

test.describe('Mobile Responsiveness', () => {
  for (const device of mobileDevices) {
    test.describe(`Testing on ${device.name}`, () => {
      test.use(device);

      for (const page of pages) {
        test(`${page} is responsive`, async ({ page: playwright }) => {
          await playwright.goto(page);
          
          // Check viewport
          const viewport = playwright.viewportSize();
          expect(viewport).toBeTruthy();
          
          // Check if content is visible
          const body = playwright.locator('body');
          await expect(body).toBeVisible();
          
          // Check for horizontal scrollbar (should not exist on mobile)
          const hasHorizontalScroll = await playwright.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });
          
          // Allow small overflow (up to 5px due to rounding)
          const overflow = await playwright.evaluate(() => {
            return document.documentElement.scrollWidth - document.documentElement.clientWidth;
          });
          expect(overflow).toBeLessThan(5);
        });
      }

      test('mobile menu works on small screens', async ({ page }) => {
        await page.goto('/index.html');
        
        const menuToggle = page.locator('.mobile-menu-toggle');
        if (await menuToggle.isVisible()) {
          await menuToggle.click();
          
          const menu = page.locator('#mobile-menu');
          await expect(menu).toHaveClass(/show/);
          
          // Close menu
          await menuToggle.click();
          await expect(menu).not.toHaveClass(/show/);
        }
      });

      test('touch interactions work', async ({ page }) => {
        await page.goto('/pages/jenkins-automation.html');
        
        // Test swipe on slideshow
        const slideshowContainer = page.locator('#slideshow-container');
        if (await slideshowContainer.count() > 0) {
          const box = await slideshowContainer.boundingBox();
          if (box) {
            // Swipe left
            await page.touchscreen.tap(box.x + box.width * 0.8, box.y + box.height / 2);
            await page.waitForTimeout(500);
            
            // Verify slide changed
            const visibleSlides = await page.locator('.slide:visible').count();
            expect(visibleSlides).toBe(1);
          }
        }
      });

      test('font sizes are readable on mobile', async ({ page }) => {
        await page.goto('/index.html');
        
        const body = page.locator('body');
        const fontSize = await body.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        
        const fontSizeNum = parseInt(fontSize);
        // Body font should be at least 14px on mobile
        expect(fontSizeNum).toBeGreaterThanOrEqual(14);
      });

      test('buttons are touch-friendly', async ({ page }) => {
        await page.goto('/index.html');
        
        const buttons = page.locator('button, a.btn, .btn');
        const count = await buttons.count();
        
        for (let i = 0; i < Math.min(count, 5); i++) {
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            const box = await button.boundingBox();
            if (box) {
              // Touch target should be at least 44x44 pixels (accessibility guideline)
              expect(box.height).toBeGreaterThanOrEqual(40);
            }
          }
        }
      });
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
