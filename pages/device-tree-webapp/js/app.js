// Main Application Logic
import { ETHERNET_DB, getSupportedBoards, generateDTS as generateDTSFromDB, validateConfiguration } from './db.js';
import { generateDTS, renderMermaid } from './generator.js';

// Application State
let state = {
  board: null,
  version: null,
  nodes: [],
  plCapabilities: null,
  plNodes: []
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  populateBoardSelector();
  attachEventListeners();
  initMermaid();
});

/**
 * Initialize Mermaid with dark theme and zoom capabilities
 */
function initMermaid() {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#764ba2',
        lineColor: '#a78bfa',
        secondaryColor: '#06b6d4',
        tertiaryColor: '#10b981'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        padding: 40,
        nodeSpacing: 100,
        rankSpacing: 100
      },
      securityLevel: 'loose'
    });
  }
}

/**
 * Populate board selector with available boards from database
 */
function populateBoardSelector() {
  const selector = document.getElementById('board-selector');
  const boards = getSupportedBoards();
  
  console.log('Boards from getSupportedBoards():', boards);
  
  // Add board options
  boards.forEach(board => {
    console.log('Adding board:', board);
    const option = document.createElement('option');
    option.value = board.id;
    option.textContent = `${board.name} - ${board.description}`;
    selector.appendChild(option);
  });
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Board selection change
  document.getElementById('board-selector').addEventListener('change', handleBoardChange);
  
  // Version selection change
  document.getElementById('version-selector').addEventListener('change', handleVersionChange);
  
  // Copy DTS button
  document.getElementById('copy-dts').addEventListener('click', copyDTSToClipboard);
}

/**
 * Handle board selection change
 */
function handleBoardChange(e) {
  const board = e.target.value;
  if (!board) {
    state.board = null;
    state.nodes = [];
    updateUI();
    return;
  }
  
  state.board = board;
  populateVersionSelector(board);
}

/**
 * Populate version selector based on selected board
 */
function populateVersionSelector(board) {
  const selector = document.getElementById('version-selector');
  selector.innerHTML = '<option value="">Select Version...</option>';
  
  // All boards support versions 2020.1 through 2024.2
  const versions = ['2020.1', '2020.2', '2021.1', '2021.2', '2022.1', '2022.2', '2023.1', '2023.2', '2024.1', '2024.2'];
  
  versions.forEach(version => {
    const option = document.createElement('option');
    option.value = version;
    option.textContent = `Vivado ${version}`;
    selector.appendChild(option);
  });
  
  selector.disabled = false;
}

/**
 * Handle version selection change
 */
function handleVersionChange(e) {
  const version = e.target.value;
  if (!version || !state.board) {
    state.version = null;
    state.nodes = [];
    updateUI();
    return;
  }
  
  // Store version in state
  state.version = version;
  
  loadBoardConfiguration(state.board, version);
}

/**
 * Load board configuration from database
 */
function loadBoardConfiguration(board, version) {
  // Validate configuration
  const validation = validateConfiguration(board, version);
  
  if (!validation.valid) {
    console.error('Invalid configuration:', validation.errors.join(', '));
    state.nodes = [];
    updateUI();
    return;
  }
  
  // Log any warnings
  if (validation.warnings.length > 0) {
    console.warn('Configuration warnings:', validation.warnings);
  }
  
  // Get board configuration from db.js
  const boardKey = board.toLowerCase().replace(/[\s-]/g, '');
  const boardConfig = ETHERNET_DB.boards[boardKey];
  
  if (!boardConfig || !boardConfig.interfaces) {
    console.error('Board configuration not found in db.js:', board);
    state.nodes = [];
    updateUI();
    return;
  }
  
  console.log(`Loading ${boardConfig.interfaces.length} interfaces for ${board}`);
  
  // Create nodes from board interfaces
  state.nodes = boardConfig.interfaces.map((iface, index) => {
    const nodeType = iface.type === 'ps_gem' ? 'PS' : 'PL';
    const nodeName = iface.gem_node || iface.axi_node || `interface_${index}`;
    
    // Calculate GEM address for PS nodes
    let nodeAddress = '';
    if (iface.gem_node) {
      const gemAddresses = {
        'gem0': '0xff0b0000',
        'gem1': '0xff0c0000',
        'gem2': '0xff0d0000',
        'gem3': '0xff0e0000'
      };
      nodeAddress = gemAddresses[iface.gem_node] || '';
    } else if (iface.axi_base_addr) {
      nodeAddress = iface.axi_base_addr;
    }
    
    // Enable locked or GEM3 by default
    const isDefaultEnabled = iface.locked || iface.gem_node === 'gem3' || (index === 0 && !boardConfig.interfaces.some(i => i.gem_node === 'gem3'));
    
    return {
      name: nodeName,
      enabled: isDefaultEnabled,
      locked: iface.locked || false,
      phyAddr: iface.phy_addr || '0x0',
      phyMode: iface.phy_mode || 'rgmii-id',
      pathway: iface.interface_type || 'Unknown',
      pathwayOptions: [iface.interface_type || 'Unknown'],
      hardwareConnection: iface.label || '',
      notes: iface.note || '',
      address: nodeAddress,
      nodeType: nodeType,
      interfaceId: iface.id,
      interfaceType: iface.type
    };
  });
  
  // Calculate PL capabilities from board interfaces
  const plInterfaces = boardConfig.interfaces.filter(iface => iface.type === 'pl_ethernet');
  state.plCapabilities = {
    axi_1g_capable: plInterfaces.some(iface => 
      ['sgmii', 'rgmii-id', '1000base-x'].includes(iface.phy_mode)
    ),
    xxv_10g_capable: plInterfaces.some(iface => 
      ['10gbase-r'].includes(iface.phy_mode)
    ),
    xxv_25g_capable: plInterfaces.some(iface => 
      ['25gbase-r'].includes(iface.phy_mode)
    )
  };
  
  // If no PL interfaces, set to null
  if (plInterfaces.length === 0) {
    state.plCapabilities = null;
  }
  
  updateUI();
}

/**
 * Extract PHY address from node configuration
 */
function extractPhyAddress(node) {
  // Try to get from phy_nodes
  if (node.phy_nodes && node.phy_nodes.length > 0) {
    const reg = node.phy_nodes[0].reg;
    if (typeof reg === 'string') {
      return parseInt(reg, 16);
    }
    return reg || 0;
  }
  
  // Try mdio phy_nodes
  if (node.mdio && node.mdio.phy_nodes && node.mdio.phy_nodes.length > 0) {
    const reg = node.mdio.phy_nodes[0].reg;
    if (typeof reg === 'string') {
      return parseInt(reg, 16);
    }
    return reg || 0;
  }
  
  return 0;
}

/**
 * Determine pathway (MIO/EMIO/GTR) from node type
 */
function determinePathway(nodeType) {
  if (!nodeType) return 'MIO';
  
  const type = nodeType.toLowerCase();
  if (type.includes('emio')) return 'EMIO';
  if (type.includes('gtr') || type.includes('10g') || type.includes('25g')) return 'GTR';
  if (type.includes('mio')) return 'MIO';
  
  return 'MIO';
}

/**
 * Update entire UI after state changes
 */
function updateUI() {
  renderPSConfig();
  renderPLConfig();
  renderDiagram();
  renderDTSPreview();
}

/**
 * Render PS Ethernet configuration section
 */
function renderPSConfig() {
  const container = document.getElementById('ps-config');
  if (!container) {
    console.error('PS config container not found');
    return;
  }
  
  console.log('renderPSConfig - state:', state);
  
  if (!state.board || !state.nodes || state.nodes.length === 0) {
    container.innerHTML = '<p class="empty-state">Select a board and version first</p>';
    return;
  }
  
  const psNodes = state.nodes.filter(n => n.nodeType === 'PS');
  console.log('PS Nodes:', psNodes);
  
  if (psNodes.length === 0) {
    container.innerHTML = '<p class="empty-state">No PS Ethernet interfaces available</p>';
    return;
  }
  
  container.innerHTML = psNodes.map(node => {
    const isLocked = node.locked;
    const pathwayBadge = node.pathway === 'MIO' ? 'mio' : 
                         node.pathway === 'GTR' ? 'gtr' : 'emio';
    const pathwayLabel = node.pathway === 'GTR' ? 'GTR (High-Speed)' : 
                         node.pathway === 'MIO' ? 'MIO (Onboard PHY)' : 
                         'EMIO (To PL)';
    
    // Determine available pathways based on board configuration
    const availablePathways = getAvailablePathways(node);
    
    return `
    <div class="gem-card ${isLocked ? 'locked' : ''}" data-gem="${node.name}" role="article" aria-label="${node.name.toUpperCase()} Ethernet Interface">
      ${isLocked ? '<div class="hardware-locked-badge" role="status">🔒 HARDWARE LOCKED</div>' : ''}
      
      <div class="gem-header">
        <div class="gem-title">
          <h3 class="gem-name">${node.name.toUpperCase()}</h3>
          <span class="badge pathway-${pathwayBadge}" role="status">${node.address}</span>
        </div>
        <label class="toggle-switch" aria-label="Enable ${node.name.toUpperCase()}" ${isLocked ? 'title="Hardware locked - always enabled"' : ''}>
          <input type="checkbox" 
                 ${node.enabled ? 'checked' : ''} 
                 ${isLocked ? 'disabled' : ''} 
                 data-index="${state.nodes.indexOf(node)}" 
                 class="gem-toggle"
                 aria-label="Toggle ${node.name.toUpperCase()}"
                 ${isLocked ? 'aria-disabled="true"' : ''}>
          <span class="toggle-slider ${isLocked ? 'locked' : ''}" aria-hidden="true"></span>
        </label>
      </div>
      
      <div class="form-group pathway-select-group">
        <select class="pathway-select" data-index="${state.nodes.indexOf(node)}" ${isLocked ? 'disabled' : ''}>
          ${availablePathways.map(pathway => `
            <option value="${pathway.value}" ${node.pathway === pathway.value ? 'selected' : ''} ${pathway.disabled ? 'disabled' : ''}>
              ${pathway.label}
            </option>
          `).join('')}
        </select>
      </div>
      
      ${node.hardwareConnection ? `
        <p class="hardware-description">${node.hardwareConnection}</p>
      ` : `<p class="hardware-description">Cadence Gigabit Ethernet MAC</p>`}
      
      ${node.notes ? `
        <div class="warning-box" role="note">
          <span class="warning-icon" aria-hidden="true">⚠️</span>
          <span>${node.notes}</span>
        </div>
      ` : node.pathway === 'EMIO' ? `
        <p class="emio-description">Available for PL-based ethernet via EMIO. Can be used with PL PCS/PMA for SFP+ connectivity.</p>
      ` : ''}
    </div>
    `;
  }).join('');
  
  // Attach event listeners
  container.querySelectorAll('.gem-toggle').forEach(checkbox => {
    checkbox.addEventListener('change', handleGemToggle);
  });
  
  container.querySelectorAll('.pathway-select').forEach(select => {
    select.addEventListener('change', handlePathwayChange);
  });
}

/**
 * Render PL Ethernet configuration section
 */
function renderPLConfig() {
  const container = document.getElementById('pl-config');
  if (!container) {
    console.error('PL config container not found');
    return;
  }
  
  console.log('renderPLConfig - state.board:', state.board);
  
  if (!state.board || !state.nodes || state.nodes.length === 0) {
    container.innerHTML = '<p class="empty-state">Select a board and version first</p>';
    return;
  }
  
  // Get PL nodes from state
  const plNodes = state.nodes.filter(n => n.nodeType === 'PL');
  console.log('PL Nodes:', plNodes);
  
  if (plNodes.length === 0) {
    container.innerHTML = '<p class="empty-state">No PL Ethernet interfaces available</p>';
    return;
  }
  
  // Render each PL interface
  container.innerHTML = plNodes.map(node => {
    const is10G = node.phyMode === '10gbase-r' || node.name.includes('10g');
    const is25G = node.phyMode === '25gbase-r';
    const isSerDes = is10G || is25G;
    const is1G = !isSerDes; // AXI 1G/2.5G interfaces
    
    const speedLabel = is25G ? '25G' : is10G ? '10G' : '1G/2.5G';
    const interfaceTypeLabel = isSerDes ? 'SFP+/SFP28' : 'SFP/RJ45';
    
    return `
    <div class="pl-capability-card ${node.enabled ? 'enabled' : ''}" 
         data-node="${node.name}" 
         role="article" 
         aria-label="${node.name} PL Ethernet Configuration"
         style="${node.enabled ? 'border-color: var(--gradient-start); box-shadow: 0 6px 30px rgba(102, 126, 234, 0.25);' : ''}">
      <div class="capability-header">
        <h3>${node.hardwareConnection || `PL Ethernet ${speedLabel}`}</h3>
        <label class="toggle-switch" aria-label="Enable ${node.name}">
          <input type="checkbox" 
                 class="pl-toggle"
                 data-index="${state.nodes.indexOf(node)}"
                 ${node.enabled ? 'checked' : ''}
                 aria-label="Toggle ${node.name}">
          <span class="toggle-slider" aria-hidden="true"></span>
        </label>
      </div>
      <p class="capability-desc">
        ${node.notes || `High-speed Ethernet MAC+PCS/PMA – Works with ${interfaceTypeLabel}`}
      </p>
      
      ${is1G && node.enabled ? `
        <div class="form-group pathway-select-group">
          <label for="pl-phy-mode-${state.nodes.indexOf(node)}">PHY Mode:</label>
          <select class="pathway-select pl-phy-mode-select" 
                  id="pl-phy-mode-${state.nodes.indexOf(node)}"
                  data-index="${state.nodes.indexOf(node)}">
            <option value="sgmii" ${node.phyMode === 'sgmii' ? 'selected' : ''}>SGMII</option>
            <option value="1000base-x" ${node.phyMode === '1000base-x' ? 'selected' : ''}>1000BASE-X</option>
            <option value="rgmii-id" ${node.phyMode === 'rgmii-id' ? 'selected' : ''}>RGMII-ID</option>
          </select>
        </div>
      ` : ''}
      
      <div class="pl-details">
        <span class="badge pathway-emio">${node.address}</span>
        <span class="badge pathway-gtr">${node.phyMode}</span>
      </div>
    </div>
    `;
  }).join('');
  
  // Attach event listeners
  container.querySelectorAll('.pl-toggle').forEach(checkbox => {
    checkbox.addEventListener('change', handlePLToggle);
  });
  
  container.querySelectorAll('.pl-phy-mode-select').forEach(select => {
    select.addEventListener('change', handlePLPhyModeChange);
  });
}

/**
 * Render Mermaid block diagram with zoom/pan support
 */
function renderDiagram() {
  const container = document.getElementById('diagram-container');
  if (!container) return;
  
  if (!state.board || !state.nodes || state.nodes.length === 0) {
    container.innerHTML = '<p class="empty-state">Select a board and version to generate diagram</p>';
    return;
  }
  
  const mermaidCode = renderMermaid(state);
  container.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
  
  // Render with Mermaid
  if (window.mermaid) {
    mermaid.run({
      nodes: container.querySelectorAll('.mermaid')
    }).then(() => {
      // Fix SVG viewBox to prevent bottom cutoff
      const svg = container.querySelector('svg');
      if (svg) {
        const viewBox = svg.getAttribute('viewBox');
        if (viewBox) {
          const [x, y, width, height] = viewBox.split(' ').map(Number);
          // Add 50 pixels of padding to the bottom
          const newHeight = height + 50;
          svg.setAttribute('viewBox', `${x} ${y} ${width} ${newHeight}`);
        }
        svg.style.margin = '0 auto';
        svg.style.display = 'block';
      }
      
      // Add pan/zoom functionality after render
      enableDiagramPanZoom(container);
    });
  }
}

/**
 * Enable pan and zoom on the diagram
 */
function enableDiagramPanZoom(container) {
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  
  container.addEventListener('mousedown', (e) => {
    // Only pan if clicking on the container, not on interactive elements
    if (e.target.closest('a, button, input, select')) return;
    
    isDragging = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
  });
  
  container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });
  
  container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });
  
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
  });
  
  // Mouse wheel zoom
  container.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const svg = container.querySelector('svg');
      if (!svg) return;
      
      const currentScale = parseFloat(svg.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || 1);
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(currentScale * delta, 0.5), 3);
      
      svg.style.transform = `scale(${newScale})`;
      svg.style.transformOrigin = 'center center';
      svg.style.transition = 'transform 0.1s ease';
    }
  }, { passive: false });
}

/**
 * Render DTS code preview
 */
function renderDTSPreview() {
  const codeElement = document.getElementById('dts-code');
  if (!codeElement) return;
  
  if (!state.board) {
    codeElement.textContent = '// Select a board to generate DTS';
    return;
  }
  
  if (!state.version) {
    codeElement.textContent = '// Select a version to generate complete DTS with board-specific quirks';
    return;
  }
  
  // Generate DTS using the state-based generator
  const dts = generateDTS(state);
  codeElement.textContent = dts;
  
  // Apply syntax highlighting
  if (window.hljs) {
    // Remove previous highlighting flag
    delete codeElement.dataset.highlighted;
    hljs.highlightElement(codeElement);
  }
}

/**
 * Copy DTS code to clipboard
 */
async function copyDTSToClipboard() {
  if (!state.board) return;
  
  const dts = generateDTS(state);
  const button = document.getElementById('copy-dts');
  
  try {
    await navigator.clipboard.writeText(dts);
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('success');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('success');
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
    button.textContent = 'Failed';
    button.classList.add('error');
    
    setTimeout(() => {
      button.textContent = 'Copy DTS';
      button.classList.remove('error');
    }, 2000);
  }
}

/**
 * Get PHY mode options based on pathway
 */
function getPhyModeOptions(selectedMode, pathway) {
  let modes = [];
  
  if (pathway === 'GTR') {
    modes = ['sgmii', '1000base-x', '10gbase-r'];
  } else if (pathway === 'EMIO') {
    modes = ['sgmii', 'gmii', '1000base-x', '10gbase-r'];
  } else { // MIO
    modes = ['rgmii-id', 'rgmii', 'gmii'];
  }
  
  return modes.map(mode => 
    `<option value="${mode}" ${mode === selectedMode ? 'selected' : ''}>${mode.toUpperCase()}</option>`
  ).join('');
}

/**
 * Handle GEM interface toggle
 */
function handleGemToggle(e) {
  const index = parseInt(e.target.dataset.index);
  if (state.nodes[index].locked) return;
  
  state.nodes[index].enabled = e.target.checked;
  updateUI();
}

/**
 * Handle PHY mode change
 */
function handlePhyModeChange(e) {
  const index = parseInt(e.target.dataset.index);
  state.nodes[index].phyMode = e.target.value;
  updateUI();
}

/**
 * Handle pathway change (GTR, MIO, EMIO)
 */
function handlePathwayChange(e) {
  const index = parseInt(e.target.dataset.index);
  state.nodes[index].pathway = e.target.value;
  updateUI();
}

/**
 * Get available pathways for a node based on board hardware capabilities
 */
function getAvailablePathways(node) {
  // If locked, only show the current pathway
  if (node.locked) {
    return [{
      value: node.pathway,
      label: node.pathway === 'GTR' ? 'GTR (High-Speed)' : 
             node.pathway === 'MIO' ? 'MIO (Onboard PHY)' : 
             'EMIO (To PL)',
      disabled: false
    }];
  }
  
  // Get board-specific capabilities
  const boardId = state.board?.toLowerCase();
  const gemNode = node.name; // e.g., "gem0", "gem1", "gem3"
  
  // Board-specific pathway rules
  const pathwayRules = {
    zcu102: {
      // ZCU102: Only GEM3 has MIO hardware. Other GEMs only support EMIO
      // No PS-GTR available on ZCU102
      gem0: ['EMIO'],
      gem1: ['EMIO'],
      gem2: ['EMIO'],
      gem3: ['MIO'] // Hardware fixed
    },
    zcu104: {
      // ZCU104: Only GEM3 has MIO hardware. Other GEMs only support EMIO
      // No PS-GTR available on ZCU104
      gem0: ['EMIO'],
      gem1: ['EMIO'],
      gem2: ['EMIO'],
      gem3: ['MIO'] // Hardware fixed
    },
    zcu106: {
      // ZCU106: Only GEM3 has MIO hardware. Other GEMs only support EMIO
      // No PS-GTR available on ZCU106
      gem0: ['EMIO'],
      gem1: ['EMIO'],
      gem2: ['EMIO'],
      gem3: ['MIO'] // Hardware fixed
    },
    ultra96v2: {
      // Ultra96-V2: Only GEM3 has MIO hardware
      gem3: ['MIO'] // Hardware fixed
    },
    kr260: {
      // KR260: GEM0 has GTR (hardwired), GEM1 has MIO (hardwired), others EMIO only
      gem0: ['GTR'], // Hardware fixed
      gem1: ['MIO'], // Hardware fixed
      gem2: ['EMIO'],
      gem3: ['EMIO']
    },
    kv260: {
      // KV260: GEM1 has MIO hardware, GEM0 has GTR capability
      gem0: ['GTR', 'EMIO'],
      gem1: ['MIO'], // Hardware fixed
      gem2: ['EMIO'],
      gem3: ['EMIO']
    },
    kd240: {
      // KD240: GEM1 has MIO hardware
      gem0: ['EMIO'],
      gem1: ['MIO'], // Hardware fixed
      gem2: ['EMIO'],
      gem3: ['EMIO']
    },
    vck190: {
      // VCK190: Versal board - GEM0 and GEM1 have RGMII via MIO
      gem0: ['MIO'], // Hardware fixed
      gem1: ['MIO']  // Hardware fixed
    },
    vmk180: {
      // VMK180: Versal board - GEM0 and GEM1 have RGMII via MIO
      gem0: ['MIO'], // Hardware fixed
      gem1: ['MIO']  // Hardware fixed
    }
  };
  
  // Get pathways for this board and GEM
  const boardRules = pathwayRules[boardId];
  let availablePathwayValues = boardRules?.[gemNode] || ['EMIO']; // Default to EMIO only
  
  // Build pathway options
  const allPathways = [
    { value: 'GTR', label: 'GTR (High-Speed)' },
    { value: 'MIO', label: 'MIO (Onboard PHY)' },
    { value: 'EMIO', label: 'EMIO (To PL)' }
  ];
  
  return allPathways.map(pathway => ({
    ...pathway,
    disabled: !availablePathwayValues.includes(pathway.value)
  }));
}

/**
 * Handle PHY address change
 */
function handlePhyAddrChange(e) {
  const index = parseInt(e.target.dataset.index);
  const value = e.target.value.trim();
  
  // Validate hex input
  if (!/^0x[0-9A-Fa-f]{0,2}$/.test(value) && value !== '') {
    e.target.value = state.nodes[index].phyAddr;
    return;
  }
  
  if (value) {
    state.nodes[index].phyAddr = value;
  }
  updateUI();
}

/**
 * Handle PL Ethernet toggle
 */
function handlePLToggle(e) {
  const index = parseInt(e.target.dataset.index);
  if (isNaN(index) || !state.nodes[index]) {
    console.error('Invalid PL toggle index:', index);
    return;
  }
  
  state.nodes[index].enabled = e.target.checked;
  console.log('PL Toggle:', state.nodes[index].name, state.nodes[index].enabled);
  
  updateUI();
}

/**
 * Handle PL PHY mode change (for AXI 1G Ethernet)
 */
function handlePLPhyModeChange(e) {
  const index = parseInt(e.target.dataset.index);
  if (isNaN(index) || !state.nodes[index]) {
    console.error('Invalid PL phy mode index:', index);
    return;
  }
  
  const oldPhyMode = state.nodes[index].phyMode;
  state.nodes[index].phyMode = e.target.value;
  console.log(`PL PHY Mode Change: ${state.nodes[index].name} from ${oldPhyMode} to ${state.nodes[index].phyMode}`);
  console.log('Updated node:', state.nodes[index]);
  
  // Update the PHY mode badge in the UI without re-rendering entire section
  const card = e.target.closest('.pl-capability-card');
  if (card) {
    const phyModeBadge = card.querySelector('.pl-details .badge.pathway-gtr');
    if (phyModeBadge) {
      phyModeBadge.textContent = e.target.value;
    }
  }
  
  // Force immediate update of diagram and DTS
  renderDiagram();
  renderDTSPreview();
}

/**
 * Handle export to file
 */
