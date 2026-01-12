const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'pages/jenkins-automation.html',
  'pages/playbook.html',
  'pages/ethernet-interfaces.html',
  'pages/cases-dashboard.html',
  'pages/ar-list.html',
  'pages/cq-list.html',
  'pages/cr-list.html'
];

async function runLighthouse(url, chrome) {
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
  };

  const runnerResult = await lighthouse(url, options);
  return runnerResult;
}

async function main() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const results = [];
  const reportsDir = path.join(__dirname, '..', 'lighthouse-reports');
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  console.log('Starting Lighthouse audits for all pages...\n');

  for (const page of pages) {
    const url = `http://localhost:8080/${page}`;
    console.log(`Auditing: ${page}`);
    
    try {
      const result = await runLighthouse(url, chrome);
      
      // Save HTML report
      const reportPath = path.join(reportsDir, `${page.replace('.html', '')}-report.html`);
      fs.writeFileSync(reportPath, result.report);
      
      // Extract scores
      const scores = {
        page: page,
        performance: result.lhr.categories.performance.score * 100,
        accessibility: result.lhr.categories.accessibility.score * 100,
        bestPractices: result.lhr.categories['best-practices'].score * 100,
        seo: result.lhr.categories.seo.score * 100
      };
      
      results.push(scores);
      
      console.log(`  Performance: ${scores.performance}`);
      console.log(`  Accessibility: ${scores.accessibility}`);
      console.log(`  Best Practices: ${scores.bestPractices}`);
      console.log(`  SEO: ${scores.seo}\n`);
      
    } catch (error) {
      console.error(`Error auditing ${page}:`, error.message);
    }
  }

  await chrome.kill();

  // Save summary
  const summaryPath = path.join(reportsDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  
  console.log(`\nAll reports saved to: ${reportsDir}`);
  console.log(`Summary: ${summaryPath}`);
  
  // Check if any scores are below threshold
  const threshold = 80;
  const failing = results.filter(r => 
    r.performance < threshold || 
    r.accessibility < threshold || 
    r.bestPractices < threshold || 
    r.seo < threshold
  );
  
  if (failing.length > 0) {
    console.log('\n⚠️  Pages with scores below 80:');
    failing.forEach(page => {
      console.log(`  - ${page.page}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All pages passed Lighthouse audits!');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
