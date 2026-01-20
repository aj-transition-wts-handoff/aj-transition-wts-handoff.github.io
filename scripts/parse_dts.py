#!/usr/bin/env python3
"""
DTS Parser for Ethernet Nodes
Extracts ethernet node information from Device Tree Source (.dts) files
and appends to ethernet_data.json in chronological order.
"""

import re
import json
import os
from pathlib import Path
from typing import Dict, List, Any, Optional


class DTSParser:
    def __init__(self, dts_file_path: str):
        self.file_path = Path(dts_file_path)
        self.content = ""
        self.version = ""
        self.design = ""
        self.board = ""
        
    def parse_filename(self):
        """Extract version, board, and design from filename"""
        # Format: {version}_{board}_{design}.dts
        # Example: 2022.1_zcu102_pl_eth_10g.dts
        filename = self.file_path.stem
        parts = filename.split('_', 2)  # Split into version, board, and rest
        
        if len(parts) >= 3:
            self.version = parts[0]
            self.board = parts[1]
            self.design = '_'.join(parts[2:])  # Rejoin the rest as design
        else:
            raise ValueError(f"Unexpected filename format: {filename}")
            
    def read_file(self):
        """Read the DTS file content"""
        with open(self.file_path, 'r', encoding='utf-8') as f:
            self.content = f.read()
            
    def extract_node(self, node_match) -> Optional[Dict[str, Any]]:
        """Extract a single node's properties"""
        node_text = node_match.group(0)
        node_name = node_match.group(1)
        
        # Check if status = "okay" or missing (implicit okay)
        status_match = re.search(r'status\s*=\s*"([^"]+)"', node_text)
        if status_match:
            status_value = status_match.group(1)
            if status_value != "okay":
                return None
            node_data = {
                "name": node_name,
                "status": "okay"
            }
        else:
            # No status property means implicitly "okay"
            node_data = {
                "name": node_name,
                "status": "okay"
            }
        
        # Determine nodeType dynamically from address
        # This is now handled in JavaScript for better flexibility
        # We just store the raw address info here
        if node_name.startswith("ethernet@ff0e"):
            node_data["nodeType"] = "PS GEM via MIO to onboard PHY"
        elif node_name.startswith("ethernet@ff"):
            node_data["nodeType"] = "PS GEM via EMIO"
        elif node_name.startswith("ethernet@a004"):
            node_data["nodeType"] = "PL Ethernet (10G/25G)"
        elif node_name.startswith("ethernet@a000") or node_name.startswith("ethernet@a001"):
            node_data["nodeType"] = "PL Ethernet (AXI 1G/2.5G)"
        else:
            node_data["nodeType"] = "Unknown"
            
        # Extract properties
        self._extract_properties(node_text, node_data)
        
        # Extract MDIO child node if present
        mdio_data = self._extract_mdio_node(node_text)
        if mdio_data:
            node_data["mdio"] = mdio_data
            
        # Extract PHY nodes directly under ethernet node (not in MDIO)
        phy_nodes = self._extract_phy_nodes_direct(node_text)
        if phy_nodes:
            node_data["phy_nodes"] = phy_nodes
            
        return node_data
        
    def _extract_properties(self, node_text: str, node_data: Dict):
        """Extract all properties from node text"""
        # Property patterns
        # String properties: prop = "value";
        string_props = re.finditer(r'(\S+)\s*=\s*"([^"]+)"\s*;', node_text)
        for match in string_props:
            key = match.group(1)
            value = match.group(2)
            # Handle escaped characters
            value = value.replace('\\0', '\\0')
            node_data[key] = value
            
        # Hex/Number properties: prop = <0x123 0x456>;
        hex_props = re.finditer(r'(\S+)\s*=\s*<([^>]+)>\s*;', node_text)
        for match in hex_props:
            key = match.group(1)
            values = match.group(2).strip().split()
            if len(values) == 1:
                node_data[key] = values[0]
            else:
                node_data[key] = ' '.join(values)
                
        # Array properties: prop = [00 11 22 33];
        array_props = re.finditer(r'(\S+)\s*=\s*\[([^\]]+)\]\s*;', node_text)
        for match in array_props:
            key = match.group(1)
            values = match.group(2).strip()
            node_data[key] = f"[{values}]"
            
        # Boolean properties (no value): prop;
        # This is tricky, need to be careful not to match other things
        bool_props = re.finditer(r'\n\s+([a-zA-Z][a-zA-Z0-9_,-]*)\s*;', node_text)
        for match in bool_props:
            key = match.group(1)
            # Skip if it's already captured or if it looks like a label
            if key not in node_data and not key.endswith(':') and key not in ['};', '{']:
                node_data[key] = True
                
    def _extract_mdio_node(self, parent_text: str) -> Optional[Dict[str, Any]]:
        """Extract MDIO child node"""
        # Match mdio { ... } block
        mdio_pattern = r'mdio\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}'
        mdio_match = re.search(mdio_pattern, parent_text)
        
        if not mdio_match:
            return None
            
        mdio_text = mdio_match.group(0)
        mdio_data = {
            "name": "mdio"
        }
        
        # Extract MDIO properties
        self._extract_properties(mdio_text, mdio_data)
        
        # Extract PHY nodes within MDIO
        phy_nodes = self._extract_phy_nodes(mdio_text)
        if phy_nodes:
            mdio_data["phy_nodes"] = phy_nodes
            
        return mdio_data
        
    def _extract_phy_nodes(self, mdio_text: str) -> List[Dict[str, Any]]:
        """Extract PHY nodes from MDIO block"""
        phy_nodes = []
        
        # Match phy@X or ethernet-phy@X nodes
        phy_pattern = r'((?:phy|ethernet-phy)@[0-9a-fA-F]+)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}'
        phy_matches = re.finditer(phy_pattern, mdio_text)
        
        for match in phy_matches:
            phy_name = match.group(1)
            phy_text = match.group(0)
            
            phy_data = {
                "name": phy_name
            }
            
            self._extract_properties(phy_text, phy_data)
            phy_nodes.append(phy_data)
            
        return phy_nodes
        
    def _extract_phy_nodes_direct(self, node_text: str) -> List[Dict[str, Any]]:
        """Extract PHY nodes directly under ethernet node (not in MDIO)"""
        # First remove MDIO block to avoid duplicates
        node_text_no_mdio = re.sub(r'mdio\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}', '', node_text)
        
        phy_nodes = []
        phy_pattern = r'((?:phy|ethernet-phy)@[0-9a-fA-F]+)\s*\{([^}]*)\}'
        phy_matches = re.finditer(phy_pattern, node_text_no_mdio)
        
        for match in phy_matches:
            phy_name = match.group(1)
            phy_text = match.group(0)
            
            phy_data = {
                "name": phy_name
            }
            
            self._extract_properties(phy_text, phy_data)
            phy_nodes.append(phy_data)
            
        return phy_nodes
        
    def extract_ethernet_nodes(self) -> List[Dict[str, Any]]:
        """Extract all ethernet nodes with status = okay"""
        ethernet_nodes = []
        
        # Pattern to match ethernet@address { ... }
        # This needs to handle nested braces
        ethernet_pattern = r'(ethernet@[0-9a-fA-F]+)\s*\{([^}]*(?:\{[^}]*(?:\{[^}]*\}[^}]*)*\}[^}]*)*)\}'
        
        matches = re.finditer(ethernet_pattern, self.content, re.DOTALL)
        
        for match in matches:
            node = self.extract_node(match)
            if node:
                ethernet_nodes.append(node)
                
        return ethernet_nodes
        
    def parse(self) -> Dict[str, Any]:
        """Main parsing method"""
        self.parse_filename()
        self.read_file()
        ethernet_nodes = self.extract_ethernet_nodes()
        
        return {
            "version": self.version,
            "design": self.design,
            "ethernet_nodes": ethernet_nodes,
            "count": len(ethernet_nodes)
        }


def parse_all_dts_files(directory: str) -> Dict[str, Any]:
    """Parse all DTS files in directory and return structured data"""
    dts_dir = Path(directory)
    results = {}
    
    # Get all .dts files
    dts_files = sorted(dts_dir.glob("*.dts"))
    
    print(f"Found {len(dts_files)} DTS files to parse")
    
    for dts_file in dts_files:
        print(f"\nParsing: {dts_file.name}")
        try:
            parser = DTSParser(str(dts_file))
            data = parser.parse()
            
            # Create key in format: version/design
            key = f"{data['version']}/{data['design']}"
            results[key] = data
            
            print(f"  ✓ Extracted {data['count']} ethernet node(s)")
            for node in data['ethernet_nodes']:
                print(f"    - {node['name']} ({node['nodeType']})")
                
        except Exception as e:
            print(f"  ✗ Error parsing {dts_file.name}: {e}")
            import traceback
            traceback.print_exc()
            
    return results


def append_to_json(new_data: Dict[str, Any], json_file: str):
    """Append new data to existing JSON file in chronological order"""
    json_path = Path(json_file)
    
    # Read existing data
    with open(json_path, 'r', encoding='utf-8') as f:
        existing_data = json.load(f)
        
    print(f"\nExisting data has {len(existing_data)} entries")
    print(f"New data has {len(new_data)} entries")
    
    # Merge data
    existing_data.update(new_data)
    
    # Sort by version/design key
    def sort_key(item):
        key = item[0]
        # Extract version (e.g., "2020.1" from "2020.1/pl_eth_10g")
        version_str = key.split('/')[0]
        # Parse version as tuple for proper sorting (2020, 1)
        version_parts = version_str.split('.')
        major = int(version_parts[0])
        minor = int(version_parts[1]) if len(version_parts) > 1 else 0
        return (major, minor, key)
    
    sorted_data = dict(sorted(existing_data.items(), key=sort_key))
    
    # Write back to file with pretty formatting
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(sorted_data, f, indent=2, ensure_ascii=False)
        
    print(f"\n✓ Successfully updated {json_path}")
    print(f"  Total entries: {len(sorted_data)}")


def main():
    """Main execution"""
    script_dir = Path(__file__).parent
    dts_directory = script_dir / "new_extracted_dt"
    json_file = script_dir / "assets" / "data" / "ethernet_data.json"
    
    print("=" * 60)
    print("DTS Ethernet Node Parser")
    print("=" * 60)
    
    # Parse all DTS files
    new_data = parse_all_dts_files(str(dts_directory))
    
    if not new_data:
        print("\n⚠ No data extracted, nothing to append")
        return
        
    # Append to JSON
    append_to_json(new_data, str(json_file))
    
    print("\n" + "=" * 60)
    print("✓ Parsing complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
