# Project Structure

## Directory Organization

```
WTS notes/
├── index.html                  # Main landing page / tracker
│
├── pages/                      # All subpages
│   ├── jenkins-automation.html # Jenkins automation documentation
│   ├── playbook.html          # Debug playbook
│   ├── ethernet-interfaces.html # Ethernet interface configurations
│   ├── cases-dashboard.html   # Support cases dashboard
│   ├── ar-list.html          # Answer Records list
│   ├── cq-list.html          # Community Questions list
│   └── cr-list.html          # Change Requests list
│
├── assets/                    # Static assets
│   ├── data/                 # Data files
│   │   └── ethernet_data.json
│   ├── images/               # Images and icons
│   │   └── favicon.svg
│   └── pdf/                  # PDF documentation
│       └── Jenkins/
│
├── css/                      # Stylesheets
│   └── styles.css           # Main stylesheet
│
├── js/                       # JavaScript files
│   ├── ar-data.js
│   ├── cases-2023.js
│   ├── cases-2024.js
│   ├── cases-2025.js
│   ├── cq-data.js
│   ├── cr-data.js
│   └── ethernet-interfaces.js
│
├── tests/                    # Playwright tests
│   ├── index.spec.js
│   ├── jenkins-automation.spec.js
│   ├── common-features.spec.js
│   ├── mobile.spec.js
│   ├── accessibility.spec.js
│   └── visual-regression.spec.js
│
├── scripts/                  # Build/automation scripts
│   └── lighthouse-all.js
│
├── .github/                  # GitHub Actions workflows
│   └── workflows/
│       ├── qa-checks.yml
│       └── pre-deploy-check.yml
│
├── parse_dts.py             # Device tree parser
├── playwright.config.js     # Playwright configuration
├── package.json             # NPM dependencies
├── README.md                # Main documentation
├── README-QA.md             # QA automation guide
└── STRUCTURE.md             # This file
```

## Path Conventions

### From Root (`index.html`)
- CSS: `css/styles.css`
- JS: `js/*.js`
- Pages: `pages/*.html`
- Assets: `assets/[data|images|pdf]/*`

### From Pages (`pages/*.html`)
- CSS: `../css/styles.css`
- JS: `../js/*.js`
- Back to index: `../index.html`
- Assets: `../assets/[data|images|pdf]/*`

## File Naming
- HTML: kebab-case (e.g., `jenkins-automation.html`)
- CSS: kebab-case (e.g., `styles.css`)
- JS: kebab-case (e.g., `ar-data.js`)
- Directories: lowercase (e.g., `pages/`, `assets/`)

## Notes
- All HTML pages except `index.html` are in `pages/` directory
- All static assets (images, PDFs, data) are in `assets/` directory
- CSS and JS remain in their own top-level directories for easy reference
- Tests are organized by type in `tests/` directory
