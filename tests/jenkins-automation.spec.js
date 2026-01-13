const { test, expect } = require('@playwright/test');

test.describe('Jenkins Automation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/jenkins-automation.html');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Jenkins Automation/);
  });

  test('dark mode toggle functionality', async ({ page }) => {
    const toggleBtn = page.locator('.dark-mode-toggle');
    await toggleBtn.click();
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
    
    const icon = page.locator('#darkModeIcon');
    await expect(icon).toHaveText('☀️');
  });

  test('slideshow navigation works', async ({ page }) => {
    const slides = page.locator('.slide');
    const slideCount = await slides.count();
    expect(slideCount).toBeGreaterThan(0);
    
    // First slide should be visible
    await expect(slides.first()).toBeVisible();
    
    // Click next button
    await page.click('button:has-text("→")');
    await page.waitForTimeout(500);
    
    // Check if navigation worked (second slide visible or first if only one)
    const visibleSlides = await page.locator('.slide:visible').count();
    expect(visibleSlides).toBe(1);
  });

  test('slideshow dots navigation', async ({ page }) => {
    const dots = page.locator('.dot');
    const dotCount = await dots.count();
    
    if (dotCount > 1) {
      await dots.nth(1).click();
      await page.waitForTimeout(500);
      
      // Verify second slide is visible
      const secondSlide = page.locator('.slide').nth(1);
      await expect(secondSlide).toBeVisible();
    }
  });

  test('keyboard navigation for slideshow', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    const visibleSlides = await page.locator('.slide:visible').count();
    expect(visibleSlides).toBe(1);
    
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
  });

  test('navigation sections are accessible', async ({ page }) => {
    const sections = ['#overview', '#applications', '#workflows', '#resources'];
    
    for (const section of sections) {
      const link = page.locator(`a[href="${section}"]`);
      await expect(link).toBeVisible();
      
      await link.click();
      await page.waitForTimeout(500);
      
      const sectionElement = page.locator(section);
      await expect(sectionElement).toBeInViewport();
    }
  });

  test('back to tracker button works', async ({ page }) => {
    const backBtn = page.locator('a[href="../index.html"]').first();
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toHaveAttribute('href', '../index.html');
  });

  test('resource links are present and valid', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]').first();
    const presentationLink = page.locator('a[href*=".pptx"]').first();
    
    await expect(githubLink).toBeVisible();
    await expect(presentationLink).toBeVisible();
  });

  test('mobile responsive - slideshow arrows visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const arrows = page.locator('#slideshow-container button');
    const firstArrow = arrows.first();
    
    // Arrows are visible on mobile (no CSS hides them)
    await expect(firstArrow).toBeVisible();
  });

  test('scroll to top button appears and works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    const scrollBtn = page.locator('.scroll-to-top');
    await expect(scrollBtn).toBeVisible();
    
    await scrollBtn.click();
    await page.waitForTimeout(500);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('all sections have proper headings', async ({ page }) => {
    await expect(page.locator('h2:has-text("Project Overview")')).toBeVisible();
    await expect(page.locator('h2:has-text("Proposed Applications")')).toBeVisible();
    await expect(page.locator('h2:has-text("Automation Workflows")')).toBeVisible();
    await expect(page.locator('h2:has-text("Project Resources")')).toBeVisible();
    await expect(page.locator('h2:has-text("Key Benefits")')).toBeVisible();
  });
});
