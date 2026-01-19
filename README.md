# 🌐 AMD Xilinx Ethernet Driver Knowledge Base
[![CI/CD - Test and Deploy](https://github.com/aj-transition-wts-handoff/aj-transition-wts-handoff.github.io/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/aj-transition-wts-handoff/aj-transition-wts-handoff.github.io/actions/workflows/ci-cd.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github)](https://aj-transition-wts-handoff.github.io/)
[![Last Updated](https://img.shields.io/badge/Last%20Updated-January%202026-blue?style=for-the-badge&logo=clock)](https://aj-transition-wts-handoff.github.io/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Live Site:** [https://aj-transition-wts-handoff.github.io/](https://aj-transition-wts-handoff.github.io/)

A comprehensive knowledge transfer portal for AMD Xilinx Ethernet driver development, maintenance, and support. This interactive documentation hub consolidates years of technical expertise, debugging workflows, case studies, and reference designs.

---

## 🚀 Features

### 📊 **Interactive Dashboards**
- **328 Support Cases** - Searchable database with severity tracking and timeline visualization
- **81 Change Requests** - Development improvements and feature requests
- **33 Answer Records** - Common solutions and troubleshooting guides
- **102 Community Questions** - Frequently asked questions and solutions

### 🌲 **Device Tree Directory**
Interactive map of **64 Ethernet device tree configurations** across multiple Vivado versions:
- PL Ethernet (1G, 10G, SGMII)
- PS EMIO Ethernet (1G, SGMII)
- PS MIO Ethernet (1G)
- Version tracking: 2020.1 through 2024.2

### 📖 **Debug Playbook**
Comprehensive troubleshooting guide covering:
- MRMAC/DCMAC debugging
- 10G/25G Ethernet Subsystem
- Common failure patterns
- Step-by-step resolution workflows

### 🔧 **Reference Designs**
- **7 Versal Designs** - VCK190, VPK180, VPK120 implementations
- **6 Zynq UltraScale+ Designs** - ZCU102, ZCU106 examples
- Complete GitHub repositories with working examples

### 👥 **Team Resources**
- Point of Contact directory
- Recurring meeting schedules
- Boardfarm integration guides
- Training materials and documentation

---

## 📈 Project Statistics

<div align="center">

| Metric | Count |
|--------|-------|
| 📋 **Total Cases Documented** | 328 |
| 🔄 **Change Requests** | 81 |
| 📝 **Answer Records** | 33 |
| 💬 **Community Questions** | 102 |
| 🌲 **Device Tree Configs** | 64 |
| 🚀 **Reference Designs** | 13 |
| 📅 **Vivado Versions Covered** | 8 |
| 🎯 **Years of Data** | 2023-2025 |

</div>

---

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (Vanilla JS)
- **Styling:** CSS Grid, Flexbox, Custom Properties (CSS Variables)
- **Features:** 
  - 🌙 Dark Mode Toggle
  - 📱 Fully Responsive Design
  - 🔍 Advanced Search & Filtering
  - 📊 Interactive Data Visualization
  - 🎨 Gradient Design System
- **Deployment:** GitHub Pages (Automatic CI/CD)
- **Version Control:** Git/GitHub

---

## 📁 Project Structure

```
├── index.html                  # Main landing page
├── cases-dashboard.html        # 328 support cases with filters
├── ar-list.html               # 33 Answer Records database
├── cr-list.html               # 81 Change Requests tracker
├── cq-list.html               # 102 Community Questions
├── ethernet-interfaces.html    # Device tree directory (64 configs)
├── playbook.html              # Debug playbook & workflows
├── css/
│   └── styles.css             # Global styles & dark mode
├── js/
│   ├── cases-2023.js          # 2023 case data
│   ├── cases-2024.js          # 2024 case data
│   ├── cases-2025.js          # 2025 case data
│   ├── ar-data.js             # Answer records data
│   ├── cr-data.js             # Change requests data
│   ├── cq-data.js             # Community questions data
│   └── ethernet-interfaces.js  # Device tree configurations
├── backup/                     # Historical versions & backups
└── pdf/                        # Reference documentation
```

---

## 🎨 Design Philosophy

### Visual Design
- **Modern Gradient System** - Vibrant, professional color palette
- **Card-Based Layout** - Clean, organized information architecture
- **Glassmorphism Effects** - Subtle depth and layering
- **Responsive Typography** - Optimized for all screen sizes

### User Experience
- **Fast Search** - Instant filtering across all databases
- **Smart Navigation** - Contextual links and breadcrumbs
- **Accessibility** - High contrast ratios, keyboard navigation
- **Mobile-First** - Optimized for phones, tablets, and desktops

---

## 🌟 Key Highlights

### Interactive Device Tree Map
Explore **64 different Ethernet configurations** with:
- Visual version comparison
- DTB/DTS file access
- Configuration highlights
- Version-specific notes

### Smart Case Dashboard
Advanced filtering by:
- **Year** (2023, 2024, 2025)
- **Severity** (Sev 1-4)
- **Status** (Open, Closed, Pending)
- **Keywords** - Instant search across titles and descriptions

### Community-Driven Content
- **102 Community Questions** answered
- Real-world debugging scenarios
- Common pitfalls and solutions
- Best practices documentation

---

## 📚 Documentation Coverage

### Supported Platforms
- ✅ Versal (VCK190, VPK180, VPK120)
- ✅ Zynq UltraScale+ (ZCU102, ZCU106)
- ✅ Multiple Ethernet IPs (MRMAC, DCMAC, 10G/25G Subsystem)

### Vivado Versions
- 2020.1, 2020.2
- 2021.1, 2021.2
- 2022.1, 2022.2
- 2023.1, 2023.2
- 2024.1, 2024.2

### Operating Systems
- Linux (PetaLinux, custom kernels)
- Baremetal applications

---

## 🚀 Quick Start

### View Live Site
Simply visit: **[https://aj-transition-wts-handoff.github.io/](https://aj-transition-wts-handoff.github.io/)**

### Local Development
```bash
# Clone the repository
git clone https://github.com/aj-transition-wts-handoff/aj-transition-wts-handoff.github.io.git

# Navigate to directory
cd aj-transition-wts-handoff.github.io

# Open in browser (or use a local server)
# Option 1: Direct file access
open index.html

# Option 2: Python simple server
python -m http.server 8000

# Option 3: Node.js live server
npx live-server
```

Then navigate to `http://localhost:8000`

---

## 🔄 Deployment

This site is automatically deployed via **GitHub Pages** on every push to the `main` branch:

```yaml
# Automatic deployment workflow
push to main → GitHub Actions → Build → Deploy to Pages
```

**Deployment URL:** `https://aj-transition-wts-handoff.github.io/`

---

## 🎯 Use Cases

### For Driver Developers
- 🔍 Search historical cases for similar issues
- 📖 Reference debug playbook for common problems
- 🌲 Find correct device tree configurations
- 🔧 Access reference designs for testing

### For Support Engineers
- 📋 Track case status and severity
- 💬 Find answers to community questions
- 📝 Reference Answer Records for quick solutions
- 🎯 Identify recurring patterns

### For Management
- 📊 Visualize support metrics
- 📈 Track CR/AR progress
- 👥 Contact team members
- 📅 View meeting schedules

---

## 🤝 Contributing

This repository serves as a knowledge transfer archive. For updates or corrections:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/update-cases`)
3. Commit your changes (`git commit -m 'Add new case data'`)
4. Push to the branch (`git push origin feature/update-cases`)
5. Open a Pull Request

---

## 📧 Contact

### Driver Team
- **Nan Zang** - WTS Lead
- **Harini Katakam** - SSW Lead

### IP Team
- **Elizabeth Zadler** - WTS IP Lead

### Resources
- 🧪 **Boardfarm:** Comment in CR or #boardfarm Slack channel
- 🎯 **FAE Support:** Assigned FAEs for specific cases

---

## 📅 Meeting Schedule

| Meeting | Frequency | Time |
|---------|-----------|------|
| 📋 Ethernet Case Review | Weekly Wednesday | 9:30 AM CST |
| 🔍 Ethernet PRT | Weekly Thursday | 9:00 AM CST |
| 🔄 SSW/WTS Driver Sync | Biweekly Monday | 9:30 AM CST |

---

## 📊 Data Sources

- AMD/Xilinx Internal Case Management System
- GitHub Issue Tracking
- Community Forums
- PetaLinux Documentation
- Vivado Design Suite Documentation

---

## 🔐 License

This is an internal knowledge transfer repository. All content is proprietary to AMD/Xilinx.

**© 2023-2026 AMD/Xilinx. All Rights Reserved.**

---

## 🌟 Acknowledgments

Special thanks to:
- **AJ** - Original documentation and knowledge compilation
- **WTS Team** - Continuous support and case resolution
- **SSW Team** - Driver development and maintenance
- **IP Team** - Hardware support and validation
- **Community Contributors** - Questions, feedback, and improvements

---

<div align="center">

### 🚀 Built with ❤️ by Ajaya Dahal - Sr. Product Application Engineer

**[Visit Live Site →](https://aj-transition-wts-handoff.github.io/)**

---

![Ethernet](https://img.shields.io/badge/Ethernet-Drivers-blue?style=flat-square)
![Xilinx](https://img.shields.io/badge/AMD-Xilinx-red?style=flat-square)
![PetaLinux](https://img.shields.io/badge/PetaLinux-Embedded-orange?style=flat-square)
![Vivado](https://img.shields.io/badge/Vivado-FPGA-purple?style=flat-square)

</div>
