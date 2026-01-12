# QA Automation for WTS Notes

## Overview
Comprehensive QA automation testing suite for all 8 HTML pages using GitHub Actions, Playwright, and accessibility tools.

## Pages Covered
1. `index.html` - Main Tracker
2. `pages/jenkins-automation.html` - Jenkins Automation Project
3. `pages/playbook.html` - Playbook
4. `pages/ethernet-interfaces.html` - Ethernet Interfaces
5. `pages/cases-dashboard.html` - Cases Dashboard
6. `pages/ar-list.html` - AR List
7. `pages/cq-list.html` - CQ List
8. `pages/cr-list.html` - CR List

## Test Categories

### 1. **HTML Validation**
- Valid HTML5 structure
- No syntax errors
- Proper tag nesting

### 2. **Link Checking**
- Internal links work
- External links are valid
- No broken references

### 3. **Performance Testing (Lighthouse)**
- Page load time < 3s
- Performance score > 80
- First Contentful Paint < 1.8s
- Time to Interactive < 3.9s

### 4. **Accessibility Testing**
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Touch target sizes (44x44px minimum)

### 5. **Cross-Browser Testing**
- Chrome/Chromium
- Firefox
- Safari/WebKit

### 6. **Mobile Responsiveness**
- iPhone 12 (375x667)
- Pixel 5 (393x851)
- iPad Pro (1024x1366)
- No horizontal scrolling
- Touch-friendly buttons
- Readable font sizes

### 7. **Functional Testing**
- Dark mode toggle
- Navigation links
- Scroll to top
- Mobile menu
- Slideshow (jenkins page)
- Search functionality
- Filtering/sorting (dashboards)

### 8. **Visual Regression**
- Desktop light/dark mode
- Mobile viewport
- Tablet viewport
- Component screenshots

### 9. **Security Scanning**
- Vulnerability detection
- Dependency audits

## Setup

### Local Testing

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Start local server
npm run server

# Run all tests
npm test

# Run specific test suites
npm run test:mobile
npm run test:accessibility
npm run test:visual

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Pre-commit Hook (Optional)

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run test:common -- --project=chromium
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## GitHub Actions Workflows

### Main QA Workflow (`.github/workflows/qa-checks.yml`)
Runs on push to main/develop and on pull requests:
- ✅ HTML validation
- ✅ Link checking
- ✅ Lighthouse performance audits
- ✅ E2E tests (Playwright)
- ✅ Accessibility tests (axe)
- ✅ Cross-browser tests
- ✅ Mobile responsiveness
- ✅ Security scanning

### Pre-Deploy Check (`.github/workflows/pre-deploy-check.yml`)
Runs before deployment:
- Quick smoke tests
- Critical path validation
- Deploy preview (Netlify)
- PR comment with results

## Test Results

### Where to Find Results

1. **GitHub Actions**
   - Go to "Actions" tab
   - Click on workflow run
   - Download artifacts (test reports, screenshots)

2. **Local Testing**
   - `playwright-report/` - HTML test report
   - `test-results/` - Screenshots, videos, traces
   - `lighthouse-reports/` - Performance reports

### View Reports

```bash
# Open Playwright HTML report
npm run test:report

# Run Lighthouse on all pages
npm run lighthouse
```

## CI/CD Integration

### Required Secrets (for full automation)

Add these to your GitHub repository secrets:

```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
PERCY_TOKEN=your_percy_token  # Optional: for visual testing
```

### Deployment Strategy

```
develop → PR → QA Tests → Staging → Full Tests → Production
```

1. **On PR**: Run quick checks + deploy preview
2. **On merge to main**: Run full test suite
3. **Before production**: Manual approval after all tests pass

## Test Coverage

### Current Coverage
- ✅ 8 HTML pages
- ✅ 100+ test cases
- ✅ 3 browsers
- ✅ 3 mobile devices
- ✅ Light + Dark modes
- ✅ Portrait + Landscape

### Test Execution Time
- Quick check: ~2 minutes
- Full suite: ~10 minutes
- Visual regression: ~5 minutes

## Maintenance

### Updating Tests

1. **Add new page**: Add to `pages` array in test files
2. **New feature**: Create spec file in `tests/`
3. **Update baselines**: Run `npm test -- --update-snapshots`

### Common Issues

**Tests failing locally but passing in CI:**
- Clear Playwright cache: `npx playwright install --force`
- Update dependencies: `npm update`

**Visual regression failures:**
- Review screenshots in `test-results/`
- Update baselines if changes are intentional

**Performance issues:**
- Check Lighthouse report details
- Optimize images, minimize CSS/JS
- Use caching strategies

## Best Practices

1. **Write atomic tests** - One concept per test
2. **Use meaningful names** - Describe what's being tested
3. **Keep tests independent** - No shared state
4. **Mock external dependencies** - Don't rely on external APIs
5. **Test user workflows** - Not implementation details
6. **Maintain test data** - Use fixtures for consistency

## Monitoring

### Key Metrics to Track
- Test pass rate (target: >98%)
- Test execution time (target: <15 min)
- Code coverage (target: >80%)
- Performance scores (target: >80)
- Accessibility violations (target: 0)

### Alerts
Set up alerts for:
- Test failures on main branch
- Performance degradation >10%
- New accessibility violations
- Broken links detected

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)

## Support

For issues or questions:
1. Check existing test output in GitHub Actions
2. Review test logs and screenshots
3. Run tests locally to reproduce
4. Update test cases as needed

---

**Last Updated:** January 12, 2026
**Test Framework:** Playwright 1.40
**Node Version:** 18+
