import os
import json
import re

# Allowed design types
ALLOWED_DESIGNS = [
    'ps_mio_eth_1g',
    'ps_emio_eth_1g', 
    'ps_emio_eth_sgmii',
    'pl_eth_1g',
    'pl_eth_sgmii',
    'pl_eth_10g'
]

def parse_node(lines, start_idx):
    """Parse a DTS node starting from the given index"""
    node = {}
    i = start_idx
    depth = 0
    children = []
    current_child = None
    
    # Get node name from the line before '{'
    if i > 0 and '{' in lines[i]:
        name_line = lines[i].strip()
        if name_line.startswith('{'):
            # Name is on previous line
            name_line = lines[i-1].strip()
        else:
            # Name is on same line as {
            name_line = name_line.split('{')[0].strip()
        
        # Clean up the name
        node['name'] = name_line.split()[0] if name_line else 'unknown'
    
    i += 1
    while i < len(lines):
        line = lines[i].strip()
        
        if not line or line.startswith('//'):
            i += 1
            continue
            
        # Track depth for nested nodes
        if '{' in line:
            # Start of child node
            child_name = line.split('{')[0].strip()
            if child_name and not any(c in child_name for c in ['=', ';']):
                # This is a child node (mdio, phy, etc)
                child_node, end_idx = parse_node(lines, i)
                child_node['name'] = child_name
                children.append(child_node)
                i = end_idx
                continue
                
        if '}' in line:
            # End of current node
            if children:
                node['children'] = children
            return node, i + 1
            
        # Parse property
        if '=' in line:
            prop_line = line.rstrip(';')
            if '=' in prop_line:
                key, value = prop_line.split('=', 1)
                key = key.strip()
                value = value.strip()
                
                # Clean up value
                if value.startswith('<') and value.endswith('>'):
                    value = value[1:-1].strip()
                elif value.startswith('[') and value.endswith(']'):
                    value = value
                elif value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                    
                node[key] = value
        elif line.endswith(';') and '=' not in line:
            # Boolean property
            prop = line.rstrip(';').strip()
            if prop:
                node[prop] = True
                
        i += 1
    
    if children:
        node['children'] = children
    return node, i

def find_ethernet_nodes(dts_path):
    """Find all ethernet nodes with status='okay' or no status (implicitly okay) in a DTS file"""
    ethernet_nodes = []
    
    try:
        with open(dts_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            # Look for ethernet or gem nodes
            if re.match(r'(ethernet@|gem@)', line):
                # Found potential ethernet node
                node_start = i
                
                # Parse the node
                node, end_idx = parse_node(lines, i)
                
                # Check if status is okay or missing (implicitly okay)
                # Only skip if status is explicitly "disabled"
                status = node.get('status', 'okay')  # Default to 'okay' if missing
                if status != 'disabled':
                    # Determine node type
                    name = node.get('name', '')
                    if 'gem@' in name or 'ethernet@' in name:
                        if 'ff0b' in name:
                            node['nodeType'] = 'PS GEM0 (MIO)'
                        elif 'ff0c' in name:
                            node['nodeType'] = 'PS GEM1 (MIO)'
                        elif 'ff0d' in name:
                            node['nodeType'] = 'PS GEM2 (EMIO)'
                        elif 'ff0e' in name:
                            node['nodeType'] = 'PS GEM3 (EMIO)'
                        elif name.startswith('ethernet@a'):
                            # PL ethernet (address starts with 'a')
                            node['nodeType'] = 'PL Ethernet (10G/25G)'
                        else:
                            node['nodeType'] = 'PL Ethernet'
                    
                    # Set status to 'okay' if it was missing
                    if 'status' not in node:
                        node['status'] = 'okay'
                    
                    ethernet_nodes.append(node)
                
                i = end_idx
            else:
                i += 1
                
    except Exception as e:
        print(f"Error parsing {dts_path}: {e}")
    
    return ethernet_nodes

def extract_child_nodes(node):
    """Extract MDIO and PHY children from ethernet node"""
    mdio_nodes = []
    phy_nodes = []
    
    if 'children' in node:
        for child in node['children']:
            child_name = child.get('name', '')
            
            if 'mdio' in child_name.lower():
                # This is an MDIO node
                mdio = {k: v for k, v in child.items() if k != 'children'}
                
                # Extract PHY nodes inside MDIO
                if 'children' in child:
                    for phy_child in child['children']:
                        if 'phy' in phy_child.get('name', '').lower():
                            phy_nodes.append(phy_child)
                
                mdio_nodes.append(mdio)
            elif 'phy' in child_name.lower():
                # PHY directly under ethernet
                phy_nodes.append(child)
    
    return mdio_nodes, phy_nodes

def parse_all_dts_files(base_dir):
    """Parse all DTS files and create JSON output"""
    all_data = {}
    
    versions = sorted([d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))])
    
    for version in versions:
        print(f"\nProcessing version: {version}")
        version_path = os.path.join(base_dir, version)
        
        designs = [d for d in os.listdir(version_path) if os.path.isdir(os.path.join(version_path, d))]
        
        for design in designs:
            # Only process allowed designs
            if design not in ALLOWED_DESIGNS:
                continue
                
            print(f"  - {design}")
            design_path = os.path.join(version_path, design)
            dts_file = os.path.join(design_path, 'system.dts')
            
            if not os.path.exists(dts_file):
                print(f"    WARNING: {dts_file} not found")
                continue
            
            # Parse ethernet nodes
            ethernet_nodes = find_ethernet_nodes(dts_file)
            
            if ethernet_nodes:
                key = f"{version}/{design}"
                
                # Extract nodes with their children properly nested
                processed_nodes = []
                for eth_node in ethernet_nodes:
                    # Create clean ethernet node
                    clean_node = {k: v for k, v in eth_node.items() if k != 'children'}
                    
                    # Extract and embed MDIO and PHY children
                    mdio_nodes, phy_nodes = extract_child_nodes(eth_node)
                    
                    if mdio_nodes:
                        clean_node['mdio'] = mdio_nodes[0]  # Take first MDIO
                        if phy_nodes:
                            clean_node['mdio']['phy_nodes'] = phy_nodes
                    elif phy_nodes:
                        # PHY directly under ethernet (no MDIO wrapper)
                        clean_node['phy_nodes'] = phy_nodes
                    
                    processed_nodes.append(clean_node)
                
                all_data[key] = {
                    'version': version,
                    'design': design,
                    'ethernet_nodes': processed_nodes,
                    'count': len(processed_nodes)
                }
                
                print(f"    Found {len(processed_nodes)} active ethernet interfaces")
    
    return all_data

if __name__ == '__main__':
    base_dir = r'C:\WTS notes\extracted_dts'
    output_file = r'C:\WTS notes\ethernet_data.json'
    
    print("Starting DTS parsing...")
    print(f"Looking for designs: {', '.join(ALLOWED_DESIGNS)}")
    
    data = parse_all_dts_files(base_dir)
    
    # Write to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    
    print(f"\n✓ Parsing complete!")
    print(f"✓ Found {len(data)} version/design combinations")
    print(f"✓ Output written to: {output_file}")
    
    # Print summary
    total_interfaces = sum(d['count'] for d in data.values())
    print(f"\n📊 Summary:")
    print(f"   Total active ethernet interfaces: {total_interfaces}")
    print(f"   Across {len(data)} configurations")
