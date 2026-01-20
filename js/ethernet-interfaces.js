        // Initialize Mermaid
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                primaryColor: '#667eea',
                primaryTextColor: '#fff',
                primaryBorderColor: '#764ba2',
                lineColor: '#764ba2',
                secondaryColor: '#f093fb',
                tertiaryColor: '#51cf66'
            }
        });

        // Dark Mode Toggle
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            
            const icon = document.getElementById('darkModeIcon');
            const text = document.getElementById('darkModeText');
            icon.textContent = isDark ? '☀️' : '🌙';
            text.textContent = isDark ? 'Light Mode' : 'Dark Mode';

            // Re-render Mermaid diagrams for theme change
            const theme = isDark ? 'dark' : 'default';
            mermaid.initialize({ 
                startOnLoad: true, 
                theme: theme,
                themeVariables: {
                    primaryColor: isDark ? '#7c90f5' : '#667eea',
                    primaryTextColor: '#fff',
                    primaryBorderColor: isDark ? '#9066c0' : '#764ba2',
                    lineColor: isDark ? '#9066c0' : '#764ba2',
                    secondaryColor: isDark ? '#faa2c1' : '#f093fb',
                    tertiaryColor: isDark ? '#69db7c' : '#51cf66'
                }
            });
        }

        // Load Dark Mode Preference
        function loadDarkMode() {
            const isDark = localStorage.getItem('darkMode') === 'true';
            if (isDark) {
                document.body.classList.add('dark-mode');
                document.getElementById('darkModeIcon').textContent = '☀️';
                document.getElementById('darkModeText').textContent = 'Light Mode';
            }
        }

        // Hamburger menu toggle
        function toggleMenu() {
            const navbar = document.querySelector('.navbar');
            navbar.classList.toggle('active');
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            const hamburger = document.querySelector('.hamburger');
            
            if (navbar && hamburger && !navbar.contains(event.target) && !hamburger.contains(event.target)) {
                navbar.classList.remove('active');
            }
        });

        // Toggle expand/collapse sections
        function toggleExpand(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) return;
            
            const icon = section.querySelector('.expand-icon');
            
            // Toggle the 'open' class for CSS animation
            section.classList.toggle('open');
            
            // Update icon
            if (icon) {
                if (section.classList.contains('open')) {
                    icon.textContent = '▲';
                } else {
                    icon.textContent = '▼';
                }
            }
        }

        // Load Ethernet Data
        let ethernetData = {};

        async function loadEthernetData() {
            try {
                const response = await fetch('../assets/data/ethernet_data.json');
                ethernetData = await response.json();
                
                // Normalize nodeType dynamically for consistency
                Object.values(ethernetData).forEach(config => {
                    config.ethernet_nodes.forEach(node => {
                        node.nodeType = determineNodeType(node.name, node.compatible);
                    });
                });
                
                console.log('✅ Loaded ethernet data from file:', Object.keys(ethernetData).length, 'configurations');
                initializeDataBrowser();
            } catch (error) {
                console.error('❌ Error loading ethernet data:', error);
                console.error('📝 Note: Make sure ethernet_data.json is accessible at ../assets/data/ethernet_data.json');
            }
        }

        // Dynamically determine nodeType from address and compatible string
        function determineNodeType(nodeName, compatible) {
            if (!nodeName) return "Unknown";
            
            // PS GEM detection
            if (nodeName.startsWith("ethernet@ff0e")) {
                return "PS GEM via MIO to onboard PHY";
            } else if (nodeName.startsWith("ethernet@ff")) {
                return "PS GEM via EMIO";
            }
            
            // PL Ethernet detection
            if (nodeName.startsWith("ethernet@a004")) {
                // Check compatible string for 10G/25G cores
                if (compatible && (compatible.includes("xxv-ethernet") || compatible.includes("usxgmii"))) {
                    return "PL Ethernet (10G/25G)";
                }
                return "PL Ethernet (10G/25G)";
            } else if (nodeName.startsWith("ethernet@a000") || nodeName.startsWith("ethernet@a001")) {
                // AXI Ethernet 1G/2.5G
                if (compatible && compatible.includes("axi-ethernet")) {
                    return "PL Ethernet (AXI 1G/2.5G)";
                }
                return "PL Ethernet (AXI 1G/2.5G)";
            }
            
            return "Unknown";
        }

        // Validate PL designs - must have at least one ethernet with address starting with 'a@'
        function isValidPLDesign(design, ethernetNodes) {
            // Only validate PL designs (pl_* prefix)
            if (!design.toLowerCase().startsWith('pl_')) {
                return true; // PS designs are always valid
            }
            
            // Check if there's at least one ethernet with address starting with 'a' or 'ethernet@a'
            return ethernetNodes.some(node => {
                const name = node.name || '';
                return name.match(/^ethernet@a[0-9a-fA-F]/);
            });
        }

        // Get invalid designs map for matrix update
        function getInvalidDesigns() {
            const invalidDesigns = {};
            
            Object.entries(ethernetData).forEach(([key, data]) => {
                const isValid = isValidPLDesign(data.design, data.ethernet_nodes);
                if (!isValid) {
                    const designKey = data.design;
                    if (!invalidDesigns[designKey]) {
                        invalidDesigns[designKey] = [];
                    }
                    invalidDesigns[designKey].push(data.version);
                    console.log(`⚠️ Invalid PL design detected: ${data.version}/${data.design} - No PL ethernet (ethernet@a...) found`);
                }
            });
            
            return invalidDesigns;
        }

        // Update matrix table to mark invalid designs
        function updateMatrixTable() {
            const invalidDesigns = getInvalidDesigns();
            
            Object.entries(invalidDesigns).forEach(([design, versions]) => {
                versions.forEach(version => {
                    // Find the matrix table cell and update it
                    const matrixTable = document.querySelector('.matrix-table');
                    if (!matrixTable) return;
                    
                    // Find the row for this design
                    const rows = matrixTable.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const designCell = row.querySelector('td strong');
                        if (designCell && designCell.textContent.trim() === design) {
                            // Find the column for this version
                            const headerCells = matrixTable.querySelectorAll('thead th');
                            let versionIndex = -1;
                            headerCells.forEach((cell, index) => {
                                if (cell.textContent.trim() === version) {
                                    versionIndex = index;
                                }
                            });
                            
                            if (versionIndex >= 0) {
                                const cells = row.querySelectorAll('td');
                                if (cells[versionIndex]) {
                                    // Update the cell to show X with a note
                                    cells[versionIndex].innerHTML = '<span class="status-badge status-unavailable" title="Invalid: No PL ethernet found">✗</span>';
                                }
                            }
                        }
                    });
                });
            });
        }

        // Initialize Data Browser
        function initializeDataBrowser() {
            if (!ethernetData || Object.keys(ethernetData).length === 0) {
                console.error('No ethernet data available');
                return;
            }

            // Populate version filter
            const versions = [...new Set(Object.values(ethernetData).map(d => d.version))].sort().reverse();
            const versionFilter = document.getElementById('versionFilter');
            versionFilter.innerHTML = '<option value="">All Versions</option>';
            versions.forEach(version => {
                const option = document.createElement('option');
                option.value = version;
                option.textContent = version;
                versionFilter.appendChild(option);
            });

            // Populate design filter (only ps_ and pl_ designs for ZCU102)
            const designs = [...new Set(Object.values(ethernetData)
                .filter(d => d.design.startsWith('ps_') || d.design.startsWith('pl_'))
                .map(d => d.design))].sort();
            const designFilter = document.getElementById('designFilter');
            designFilter.innerHTML = '<option value="">All Designs</option>';
            designs.forEach(design => {
                const option = document.createElement('option');
                option.value = design;
                option.textContent = design.replace(/_/g, ' ').toUpperCase();
                designFilter.appendChild(option);
            });

            // Update matrix table with validation
            updateMatrixTable();

            // Initial render
            renderFilteredData();
        }

        // Filter and render data
        function renderFilteredData() {
            const versionFilter = document.getElementById('versionFilter').value;
            const designFilter = document.getElementById('designFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;

            const filtered = Object.entries(ethernetData).filter(([key, data]) => {
                // Only show ZCU102 designs (ps_ or pl_ prefix) - other boards have their own section
                if (!data.design.startsWith('ps_') && !data.design.startsWith('pl_')) {
                    return false;
                }
                
                if (versionFilter && data.version !== versionFilter) return false;
                if (designFilter && data.design !== designFilter) return false;
                
                // Exclude invalid PL designs
                if (!isValidPLDesign(data.design, data.ethernet_nodes)) {
                    return false;
                }
                
                // Type filter (PS GEM, PL Ethernet, etc.)
                if (typeFilter) {
                    const hasType = data.ethernet_nodes.some(node => {
                        if (typeFilter === 'ps_gem' && node.nodeType && node.nodeType.includes('GEM')) return true;
                        if (typeFilter === 'pl_ethernet' && node.nodeType && node.nodeType.includes('PL Ethernet')) return true;
                        return false;
                    });
                    if (!hasType) return false;
                }
                
                return true;
            });

            // Sort by version (descending)
            filtered.sort((a, b) => {
                const versionA = parseFloat(a[1].version);
                const versionB = parseFloat(b[1].version);
                return versionB - versionA;
            });

            renderResults(filtered);
        }

        // Render results - Group by version/design
        function renderResults(filtered) {
            const resultsContainer = document.getElementById('resultsContainer');
            
            if (filtered.length === 0) {
                resultsContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No ethernet interfaces found matching your filters.</p>';
                return;
            }

            const totalNodes = filtered.reduce((sum, [key, data]) => sum + data.ethernet_nodes.length, 0);
            
            let html = `
                <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #667eea; margin: 0;">Found ${totalNodes} active ethernet interface(s)</h3>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="expandAll()" class="expand-collapse-btn">▼ Expand All</button>
                        <button onclick="collapseAll()" class="expand-collapse-btn">▲ Collapse All</button>
                    </div>
                </div>
            `;

            filtered.forEach(([key, data]) => {
                const designName = data.design.replace(/_/g, ' ').toUpperCase();
                const groupId = key.replace(/[\/\.]/g, '-');
                
                html += `
                    <div class="design-group">
                        <div class="design-header" onclick="toggleDesignContent('${groupId}')">
                            <div class="design-info">
                                <span class="version-badge">${data.version}</span>
                                <span class="design-name">${designName}</span>
                                <span class="node-count">${data.ethernet_nodes.length} node(s)</span>
                            </div>
                            <span id="toggle-${groupId}" class="group-toggle-icon">▼</span>
                        </div>
                        <div id="content-${groupId}" class="design-content" style="display: none;">
                            ${renderEthernetNodes(data.ethernet_nodes, data.version, data.design)}
                        </div>
                    </div>
                `;
            });

            resultsContainer.innerHTML = html;
        }

        // Render ethernet nodes within a design
        function renderEthernetNodes(nodes, version, design) {
            return nodes.map((node, index) => {
                const nodeId = `node-${version.replace(/\./g, '-')}-${design}-${index}`;
                const typeColor = node.nodeType && node.nodeType.includes('GEM') ? '#27ae60' : 
                                  node.nodeType && node.nodeType.includes('10G') ? '#3498db' : '#e74c3c';
                
                return `
                    <div class="ethernet-node-card" onclick="toggleNodeDetails('${nodeId}', event)" style="cursor: pointer;">
                        <div class="ethernet-node-header">
                            <div class="node-info">
                                <h4 style="color: ${typeColor};">📡 ${node.name || 'Unknown'}</h4>
                                <span class="node-type-badge" style="background: ${typeColor};">${node.nodeType || 'Unknown'}</span>
                                <span id="toggle-icon-${nodeId}" class="node-toggle-icon">▶</span>
                            </div>
                        </div>
                        <div class="node-properties">
                            ${renderNodeProperties(node)}
                        </div>
                        <div id="dt-${nodeId}" class="device-tree-section" style="display: none;" onclick="event.stopPropagation()">
                            <div class="section-header">
                                <h5>🌲 Device Tree Node</h5>
                                <button onclick="copyDeviceTree('${nodeId}', event)" class="copy-button">📋 Copy</button>
                            </div>
                            <pre><code id="dt-code-${nodeId}" class="language-dts">${generateDeviceTreeCode(node, version, design)}</code></pre>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render node properties
        function renderNodeProperties(node) {
            const properties = [
                { label: 'Compatible', value: node.compatible },
                { label: 'PHY Mode', value: node['phy-mode'] },
                { label: 'Register', value: node.reg },
                { label: 'Interrupts', value: node.interrupts }
            ];

            return properties
                .filter(p => p.value)
                .map(p => `<div class="property-item"><strong>${p.label}:</strong> <span>${p.value}</span></div>`)
                .join('');
        }

        // Toggle design group content
        function toggleDesignContent(groupId) {
            const content = document.getElementById('content-' + groupId);
            const toggle = document.getElementById('toggle-' + groupId);
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.textContent = '▲';
            } else {
                content.style.display = 'none';
                toggle.textContent = '▼';
            }
        }

        // Generate Device Tree Code
        function generateDeviceTreeCode(node, version, design) {
            let code = '/* ' + version + '/' + design + ' - ' + node.nodeType + ' */\n\n';
            code += (node.name || 'ethernet') + ' {\n';
            
            // Add ethernet properties
            if (node.compatible) {
                const compatibles = node.compatible.replace(/\\0/g, '", "');
                code += '    compatible = "' + compatibles + '";\n';
            }
            if (node.status) {
                code += '    status = "' + node.status + '";\n';
            }
            if (node.reg) {
                code += '    reg = <' + node.reg + '>;\n';
            }
            if (node.interrupts) {
                code += '    interrupts = <' + node.interrupts + '>;\n';
            }
            if (node['phy-mode']) {
                code += '    phy-mode = "' + node['phy-mode'] + '";\n';
            }
            if (node['phy-handle']) {
                code += '    phy-handle = <' + node['phy-handle'] + '>;\n';
            }
            if (node['local-mac-address']) {
                code += '    local-mac-address = ' + node['local-mac-address'] + ';\n';
            }
            if (node['clock-names']) {
                const clocks = node['clock-names'].replace(/\\0/g, '", "');
                code += '    clock-names = "' + clocks + '";\n';
            }
            if (node['xlnx,ptp-enet-clock']) {
                code += '    xlnx,ptp-enet-clock = <' + node['xlnx,ptp-enet-clock'] + '>;\n';
            }
            
            // Add MDIO node with nested PHY
            if (node.mdio) {
                code += '\n    ' + node.mdio.name + ' {\n';
                if (node.mdio['#address-cells']) {
                    code += '        #address-cells = <' + node.mdio['#address-cells'] + '>;\n';
                }
                if (node.mdio['#size-cells']) {
                    code += '        #size-cells = <' + node.mdio['#size-cells'] + '>;\n';
                }
                
                // Add PHY nodes inside MDIO
                if (node.mdio.phy_nodes && node.mdio.phy_nodes.length > 0) {
                    node.mdio.phy_nodes.forEach(phy => {
                        code += '\n        ' + phy.name + ' {\n';
                        if (phy.reg) {
                            code += '            reg = <' + phy.reg + '>;\n';
                        }
                        if (phy.compatible) {
                            code += '            compatible = "' + phy.compatible + '";\n';
                        }
                        if (phy['device_type']) {
                            code += '            device_type = "' + phy['device_type'] + '";\n';
                        }
                        if (phy['ti,rx-internal-delay']) {
                            code += '            ti,rx-internal-delay = <' + phy['ti,rx-internal-delay'] + '>;\n';
                        }
                        if (phy['ti,tx-internal-delay']) {
                            code += '            ti,tx-internal-delay = <' + phy['ti,tx-internal-delay'] + '>;\n';
                        }
                        if (phy['ti,fifo-depth']) {
                            code += '            ti,fifo-depth = <' + phy['ti,fifo-depth'] + '>;\n';
                        }
                        if (phy['ti,dp83867-rxctrl-strap-quirk']) {
                            code += '            ti,dp83867-rxctrl-strap-quirk;\n';
                        }
                        if (phy.phandle) {
                            code += '            phandle = <' + phy.phandle + '>;\n';
                        }
                        code += '        };\n';
                    });
                }
                
                code += '    };\n';
            }
            // Add PHY nodes directly if no MDIO wrapper
            else if (node.phy_nodes && node.phy_nodes.length > 0) {
                code += '\n    /* PHY nodes (should typically be under MDIO) */\n';
                node.phy_nodes.forEach(phy => {
                    code += '\n    ' + phy.name + ' {\n';
                    if (phy.reg) {
                        code += '        reg = <' + phy.reg + '>;\n';
                    }
                    if (phy.compatible) {
                        code += '        compatible = "' + phy.compatible + '";\n';
                    }
                    if (phy['ti,rx-internal-delay']) {
                        code += '        ti,rx-internal-delay = <' + phy['ti,rx-internal-delay'] + '>;\n';
                    }
                    if (phy['ti,tx-internal-delay']) {
                        code += '        ti,tx-internal-delay = <' + phy['ti,tx-internal-delay'] + '>;\n';
                    }
                    if (phy['ti,fifo-depth']) {
                        code += '        ti,fifo-depth = <' + phy['ti,fifo-depth'] + '>;\n';
                    }
                    if (phy['ti,dp83867-rxctrl-strap-quirk']) {
                        code += '        ti,dp83867-rxctrl-strap-quirk;\n';
                    }
                    if (phy.phandle) {
                        code += '        phandle = <' + phy.phandle + '>;\n';
                    }
                    code += '    };\n';
                });
            }
            // If PS GEM but no MDIO/PHY nodes, add a note
            else if (node.nodeType && node.nodeType.includes("PS GEM") && node.name.startsWith("ethernet@ff")) {
                code += '\n    /* Note: MDIO and PHY configuration may be in separate nodes */\n';
            }
            
            code += '};';
            return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        // Toggle node details
        function toggleNodeDetails(nodeId, event) {
            if (event) event.stopPropagation();
            const details = document.getElementById('dt-' + nodeId);
            const icon = document.getElementById('toggle-icon-' + nodeId);
            
            if (details.style.display === 'none') {
                details.style.display = 'block';
                icon.textContent = '▼';
                // Highlight code after showing
                setTimeout(() => {
                    const codeBlock = document.getElementById('dt-code-' + nodeId);
                    if (codeBlock && typeof Prism !== 'undefined') {
                        Prism.highlightElement(codeBlock);
                    }
                }, 10);
            } else {
                details.style.display = 'none';
                icon.textContent = '▶';
            }
        }

        // Copy device tree to clipboard
        function copyDeviceTree(nodeId, event) {
            if (event) event.stopPropagation();
            const codeElement = document.getElementById('dt-code-' + nodeId);
            const text = codeElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const button = codeElement.closest('.device-tree-section').querySelector('.copy-button');
                const originalText = button.textContent;
                button.textContent = '✅ Copied!';
                button.style.background = 'linear-gradient(135deg, #51cf66, #37b24d)';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            });
        }



        // Expand all design groups
        function expandAll() {
            document.querySelectorAll('.design-content').forEach(content => {
                content.style.display = 'block';
                const groupId = content.id.replace('content-', '');
                const toggle = document.getElementById('toggle-' + groupId);
                if (toggle) toggle.textContent = '▲';
            });
        }

        // Collapse all design groups and device trees
        function collapseAll() {
            document.querySelectorAll('.design-content').forEach(content => {
                content.style.display = 'none';
                const groupId = content.id.replace('content-', '');
                const toggle = document.getElementById('toggle-' + groupId);
                if (toggle) toggle.textContent = '▼';
            });
            // Also collapse all device trees
            document.querySelectorAll('.device-tree-section').forEach(dt => {
                dt.style.display = 'none';
            });
            document.querySelectorAll('.node-toggle-icon').forEach(icon => {
                icon.textContent = '▶';
            });
        }

        // Initialize on page load
        window.addEventListener('DOMContentLoaded', () => {
            loadDarkMode();
            loadEthernetData();
        });

        // Scroll to top functionality
        window.addEventListener('scroll', function() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            if (scrollBtn && window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else if (scrollBtn) {
                scrollBtn.classList.remove('show');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
