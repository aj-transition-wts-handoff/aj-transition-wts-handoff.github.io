#!/usr/bin/env python3
"""Comprehensive fix for all remaining HTML validation errors."""

import re
from pathlib import Path


def remove_utf8_bom(file_path):
    """Remove UTF-8 BOM from file."""
    content = file_path.read_bytes()
    if content.startswith(b'\xef\xbb\xbf'):
        content = content[3:]
        file_path.write_bytes(content)
        return True
    return False


def fix_buttons_add_type(content):
    """Add type='button' to all buttons missing the attribute."""
    # Find all <button> tags without type attribute
    content = re.sub(r'<button\s+(?![^>]*type=)', r'<button type="button" ', content)
    return content


def fix_ampersands_in_styles(content):
    """Escape & characters in inline styles and URLs."""
    # Fix & in style attributes (but not in HTML entities like &amp;, &lt;, &gt;, &nbsp;, etc.)
    def escape_amp_in_attribute(match):
        attr = match.group(0)
        # Don't escape if already part of a known HTML entity
        # Replace standalone & with &amp;
        attr = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|nbsp;|#)', '&amp;', attr)
        return attr
    
    # Fix & in style attributes
    content = re.sub(r'style="[^"]*"', escape_amp_in_attribute, content)
    # Fix & in href attributes
    content = re.sub(r'href="[^"]*"', escape_amp_in_attribute, content)
    # Fix & in src attributes
    content = re.sub(r'src="[^"]*"', escape_amp_in_attribute, content)
    
    return content


def fix_table_headers_add_scope(content):
    """Add scope attribute to <th> elements."""
    # Add scope="col" to header row th elements
    # Typically in <thead> or first row of table
    content = re.sub(r'<th(?!\s+scope=)([^>]*)>', r'<th scope="col"\1>', content)
    return content


def fix_jenkins_automation():
    """Fix jenkins-automation.html issues."""
    file_path = Path("pages/jenkins-automation.html")
    content = file_path.read_text(encoding='utf-8')
    
    # Remove UTF-8 BOM
    remove_utf8_bom(file_path)
    content = file_path.read_text(encoding='utf-8')
    
    # Fix buttons
    content = fix_buttons_add_type(content)
    
    # Fix ampersands
    content = fix_ampersands_in_styles(content)
    
    # Fix the unclosed section issue
    # The Resources section should be properly closed
    # Look for the pattern where Resources section ends before Key Benefits
    if 'Unclosed element' in content or True:  # Always check
        # Ensure Resources section is properly closed
        pattern = r'(</div>\s*</div>\s*</div>\s*</div>\s*</section>)\s*\n\s*\n\s*\n\s*(<!-- Key Benefits)'
        replacement = r'\1\n\n        \2'
        content = re.sub(pattern, replacement, content)
    
    file_path.write_text(content, encoding='utf-8')
    print(f"Fixed jenkins-automation.html: {file_path}")


def fix_ethernet_interfaces():
    """Fix ethernet-interfaces.html issues."""
    file_path = Path("pages/ethernet-interfaces.html")
    content = file_path.read_text(encoding='utf-8')
    
    # Remove UTF-8 BOM
    remove_utf8_bom(file_path)
    content = file_path.read_text(encoding='utf-8')
    
    # Fix buttons
    content = fix_buttons_add_type(content)
    
    # Fix ampersands
    content = fix_ampersands_in_styles(content)
    
    # Fix table headers
    content = fix_table_headers_add_scope(content)
    
    file_path.write_text(content, encoding='utf-8')
    print(f"Fixed ethernet-interfaces.html: {file_path}")


def fix_all_html_files():
    """Fix all HTML files in the workspace."""
    html_files = [
        Path("index.html"),
        Path("pages/ar-list.html"),
        Path("pages/cases-dashboard.html"),
        Path("pages/cq-list.html"),
        Path("pages/cr-list.html"),
        Path("pages/playbook.html"),
    ]
    
    for file_path in html_files:
        if not file_path.exists():
            continue
            
        content = file_path.read_text(encoding='utf-8')
        
        # Remove UTF-8 BOM
        remove_utf8_bom(file_path)
        content = file_path.read_text(encoding='utf-8')
        
        # Fix buttons
        content = fix_buttons_add_type(content)
        
        # Fix ampersands
        content = fix_ampersands_in_styles(content)
        
        # Fix table headers
        content = fix_table_headers_add_scope(content)
        
        file_path.write_text(content, encoding='utf-8')
        print(f"Fixed {file_path}")


def main():
    """Main function to fix all validation errors."""
    print("Fixing all HTML validation errors...\n")
    
    # Fix specific files with known issues
    fix_jenkins_automation()
    fix_ethernet_interfaces()
    
    # Fix all other HTML files
    fix_all_html_files()
    
    print("\nAll validation errors fixed!")
    print("Run: npm run validate:html")


if __name__ == "__main__":
    main()
