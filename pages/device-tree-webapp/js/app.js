// Main Application Logic
import { ETHERNET_DB } from './db.js';
import { generateDTS, renderMermaid } from './generator.js';

// Application State
let state = {
  board: null,
  nodes: []
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  populateBoardSelector();
  attachEventListeners();
  initMermaid();
});

/**
 * Initialize Mermaid with dark theme
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
      }
    });
  }
}

/**
 * Populate board selector with available boards from database
 */
function populateBoardSelector() {
  const selector = document.getElementById('board-selector');
  const boards = new Set();
  
  // Extract unique boards from database
  Object.keys(ETHERNET_DB).forEach(key => {
    const board = ETHERNET_DB[key].board || ETHERNET_DB[key].design;
    boards.add(board);
  });
  
  // Add board options
  Array.from(boards).sort().forEach(board => {
    const option = document.createElement('option');
    option.value = board;
    option.textContent = board.toUpperCase();
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
  
  const versions = Object.keys(ETHERNET_DB)
    .filter(key => {
      const configBoard = ETHERNET_DB[key].board || ETHERNET_DB[key].design;
      return configBoard === board;
    })
    .map(key => ETHERNET_DB[key].version)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort();
  
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
    state.nodes = [];
    updateUI();
    return;
  }
  
  loadBoardConfiguration(state.board, version);
}

/**
 * Load board configuration from database
 */
function loadBoardConfiguration(board, version) {
  const key = `${version}/${board}`;
  const config = ETHERNET_DB[key];
  
  if (!config || !config.ethernet_nodes) {
    console.error('Configuration not found:', key);
    state.nodes = [];
    updateUI();
    return;
  }
  
  // Parse nodes from configuration
  state.nodes = config.ethernet_nodes.map((node, index) => ({
    name: node.name || `ethernet@${index}`,
    enabled: true,
    phyAddr: extractPhyAddress(node),
    phyMode: node['phy-mode'] || 'rgmii-id',
    pathway: determinePathway(node.nodeType),
    compatible: node.compatible || 'cdns,gem',
    status: node.status || 'okay',
    reg: node.reg,
    nodeType: node.nodeType
  }));
  
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
  renderGEMConfigurator();
  renderDiagram();
  renderDTSPreview();
}

/**
 * Render GEM configurator controls
 */
function renderGEMConfigurator() {
  const container = document.getElementById('gem-list');
  container.innerHTML = '';
  
  if (!state.nodes || state.nodes.length === 0) {
    container.innerHTML = '<p class="empty-state">Select a board and version to configure ethernet nodes</p>';
    return;
  }
  
  state.nodes.forEach((node, index) => {
    const item = document.createElement('div');
    item.className = 'gem-item';
    
    const pathway = node.pathway || 'MIO';
    const pathwayClass = `pathway-${pathway.toLowerCase()}`;
    
    item.innerHTML = `
      <div class="gem-header">
        <div class="gem-title">
          <label class="toggle-switch">
            <input type="checkbox" ${node.enabled ? 'checked' : ''} data-index="${index}">
            <span class="toggle-slider"></span>
          </label>
          <span class="gem-name">${node.name}</span>
          <span class="pathway-badge ${pathwayClass}">${pathway}</span>
        </div>
      </div>
      ${node.enabled ? `
        <div class="gem-controls">
          <div class="form-group">
            <label>PHY Address (hex)</label>
            <input type="text" 
                   class="phy-addr-input" 
                   value="${node.phyAddr.toString(16).toUpperCase()}" 
                   data-index="${index}"
                   maxlength="2">
          </div>
          <div class="form-group">
            <label>PHY Mode</label>
            <select class="phy-mode-select" data-index="${index}">
              ${getPhyModeOptions(node.phyMode)}
            </select>
          </div>
        </div>
      ` : ''}
    `;
    
    container.appendChild(item);
  });
  
  // Attach event listeners
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', handleNodeToggle);
  });
  
  container.querySelectorAll('.phy-addr-input').forEach(input => {
    input.addEventListener('input', handlePhyAddrChange);
  });
  
  container.querySelectorAll('.phy-mode-select').forEach(select => {
    select.addEventListener('change', handlePhyModeChange);
  });
}

/**
 * Get PHY mode options HTML
 */
function getPhyModeOptions(selected) {
  const modes = ['rgmii-id', 'sgmii', 'gmii', '1000base-x', '10gbase-r', 'base-r'];
  return modes.map(mode => 
    `<option value="${mode}" ${mode === selected ? 'selected' : ''}>${mode}</option>`
  ).join('');
}

/**
 * Handle node enable/disable toggle
 */
function handleNodeToggle(e) {
  const index = parseInt(e.target.dataset.index);
  state.nodes[index].enabled = e.target.checked;
  updateUI();
}

/**
 * Handle PHY address change
 */
function handlePhyAddrChange(e) {
  const index = parseInt(e.target.dataset.index);
  const value = e.target.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
  e.target.value = value;
  
  if (value) {
    state.nodes[index].phyAddr = parseInt(value, 16);
    updateUI();
  }
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
 * Render Mermaid diagram
 */
async function renderDiagram() {
  const container = document.getElementById('diagram-container');
  const mermaidCode = renderMermaid(state);
  
  container.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
  
  if (window.mermaid) {
    try {
      await mermaid.run({
        querySelector: '.mermaid'
      });
    } catch (error) {
      console.error('Mermaid rendering error:', error);
    }
  }
}

/**
 * Render DTS preview
 */
function renderDTSPreview() {
  const dts = generateDTS(state);
  const codeElement = document.getElementById('dts-code');
  
  codeElement.textContent = dts;
  
  // Apply syntax highlighting if Prism is available
  if (window.Prism) {
    Prism.highlightElement(codeElement);
  }
}

/**
 * Copy DTS code to clipboard
 */
async function copyDTSToClipboard() {
  const dts = generateDTS(state);
  const button = document.getElementById('copy-dts');
  
  try {
    await navigator.clipboard.writeText(dts);
    button.innerHTML = '<i data-lucide="check"></i> Copied!';
    button.classList.add('success');
    
    setTimeout(() => {
      button.innerHTML = '<i data-lucide="copy"></i> Copy DTS';
      button.classList.remove('success');
      if (window.lucide) lucide.createIcons();
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
    button.innerHTML = '<i data-lucide="x"></i> Failed';
    button.classList.add('error');
    
    setTimeout(() => {
      button.innerHTML = '<i data-lucide="copy"></i> Copy DTS';
      button.classList.remove('error');
      if (window.lucide) lucide.createIcons();
    }, 2000);
  }
  
  if (window.lucide) lucide.createIcons();
}
