CRITICAL INSTRUCTION FOR AI: This project is a "Vanilla JS" application.

NO npm, react, vite, webpack, or node_modules.

NO build steps.

The application must run by simply opening index.html in a browser.

1. Project Mission
Name: Xilinx Ethernet Device Tree Architect Goal: Build a high-performance, client-side tool for hardware engineers to configure ZynqMP/Versal Ethernet subsystems (GEM -> MDIO -> PHY) and generate valid Device Tree Source (DTS) code. Visual Style: "Kickass." We are preserving the high-end Glassmorphism, specific color-coding (Green/Pink/Blue), and gradients from the legacy styles.css.

2. Tech Stack (Strict)
Core: HTML5, CSS3, JavaScript (ES6+ Modules).

Diagram Engine: Mermaid.js (via CDN) for real-time block diagrams.

Syntax Highlighting: Prism.js (via CDN) for the generated code.

Icons: Lucide Icons (via CDN).

Fonts: Poppins (Google Fonts).

3. Directory Structure
Maintain this exact structure.

Plaintext

/device-tree-webapp
├── index.html          # Main entry point (Layout & Containers)
├── css/
│   └── styles.css      # The "Kickass" design system (Dark Mode, Gradients)
├── js/
│   ├── db.js           # The static hardware database (ZCU102, KR260 data)
│   ├── generator.js    # Logic to convert State -> DTS String
│   └── app.js          # Main logic (Event listeners, Mermaid rendering)
└── assets/
    └── favicon.svg     # Project Icon
4. Visual Identity & Design System
Do not invent styles. Use these CSS variables which match the user's legacy site.

Colors
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

Dark Mode Bg: #1a202c (Slate 900)

Card Bg (Light): #ffffff (White with shadow)

Card Bg (Dark): #2d3748 (Slate 800)

Pathway Colors:

MIO (Success): #51cf66 (Border/Badge)

EMIO (Danger): #f5576c (Border/Badge)

GTR (Primary): #3949ab (Border/Badge)

UI Components
Navbar: Glassmorphism (backdrop-filter: blur(10px)), fixed top, gradient text logo.

Panels: Rounded corners (border-radius: 12px), heavy shadows (box-shadow: 0 10px 30px rgba(0,0,0,0.15)).

Inputs: Styled styling for dropdowns and checkboxes (no default browser styles).

5. Functional Requirements
The "Architect" Interface (Grid Layout)
The main view is a Split Screen (Responsive: Stacked on Mobile, Side-by-Side on Desktop).

Left Panel: The Controls
Board Selector: Dropdown to pick the platform (e.g., "ZCU102 - 2024.1").

GEM Configurator:

List of GEMs (GEM0, GEM1, etc.).

Toggle: Enable/Disable GEM.

Mode: Dropdown (rgmii-id, sgmii, 1000base-x).

PHY Address: Hex Input (0x0c).

Ref Clock: Input for tx_clk.

Right Panel: The Visuals
Top: Live Diagram:

A container <div class="mermaid"> that updates instantly when controls change.

Logic: Generate a graph definition string: graph LR; GEM0 -->|rgmii| PHY0(0x0c);

Bottom: Code Preview:

A <pre><code class="language-dts"> block.

Shows the standard Xilinx system-user.dtsi format.

Includes a "Copy to Clipboard" button.

6. Implementation Strategy
Step 1: The Data Layer (js/db.js)
Extract the JSON from the user's provided ethernet-interfaces.html. Structure it as a constant:

JavaScript

export const ETHERNET_DB = {
    "zcu102": {
        "2024.1": { ...node_data... }
    },
    // ... other boards
};
Step 2: The Generator (js/generator.js)
Create a function generateDTS(state) that returns a string.

Input: state object (selected board, enabled GEMs, PHY addrs).

Output: Formatted DTS string.

Step 3: The Graph (js/app.js)
Create a function renderMermaid(state).

Logic: Construct a Mermaid syntax string based on enabled nodes.

Execution: mermaid.render('graphDiv', string).then(...) to update the DOM without page reload.

7. Copilot/AI Rules
Mobile First: Ensure CSS Grid uses grid-template-columns: 1fr on mobile and 300px 1fr on desktop.

Error Handling: If Mermaid fails to parse (e.g., bad syntax), display a friendly "Rendering..." placeholder, not a crash.

Clean Code: Use semantic HTML (<main>, <section>, <header>). Use const/let and Arrow Functions in JS.

Preservation: Keep the "Back to Tracker" floating button logic from the original site.

8. Legacy Source Analysis & Data Extraction
Context: This project is a creation of an additional tool for an existing static site (ethernet-interfaces.html in the parent dir../pages; scan if needed). You must respect the data and styles found in these three core files:

A. index.html (The Landing Page)
Role: The entry point.

Key Elements: Contains the global Navbar, the "Powered by coffee and AI" footer animation, and the "Back to Tracker" button logic.

Action: We will replicate the layout structure (Hero -> Grid) here but replace the static links with our new interactive App interface.

B. css/styles.css (The Design System)
Role: The absolute Source of Truth for visual identity.

Key Variables:

--bg-gradient-start / --bg-gradient-end: The signature Purple/Blue background.

--success-color (Green), --danger-color (Red), --primary-color (Blue): These match the MIO/EMIO/GTR pathway logic.

.glass-panel: The class defining the backdrop-blur effect.

Action: This file is preserved 1:1. Do not overwrite it with generic CSS.

C. pages/ethernet-interfaces.html (The Data Mine)
Role: The previous "Matrix Viewer" for device trees.

The Critical Data:

Inside this file is a <script id="ethernet-data-embedded"> (or a global const variable inside a script tag).

Content: This JSON object contains the actual Device Tree Source (DTS) snippets for every board (ZCU102, KR260, VCK190) and every version (2020.1 - 2025.1).

Action for AI:

Do not invent data. You must extract this specific JSON object.

Transformation: You will move this object into js/db.js and assign it to export const ETHERNET_DB.

Structure: The JSON is organized by Board -> Version -> Interface Type. Keep this hierarchy.