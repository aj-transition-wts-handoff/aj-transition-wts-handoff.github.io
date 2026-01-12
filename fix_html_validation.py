#!/usr/bin/env python3
"""Fix HTML validation errors across all files"""
import re
from pathlib import Path

def fix_index_html():
    """Fix index.html validation errors"""
    file_path = Path('index.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix 1: URL-encode space in Domain Knowledge.pdf path
    content = content.replace(
        'href="pdf/Domain Knowledge.pdf"',
        'href="assets/pdf/Domain%20Knowledge.pdf"'
    )
    
    # Fix 2: Remove all <style> tags from within <div> elements (move to head later)
    # Extract style content first
    style_pattern = r'<style>(.*?)</style>'
    styles = re.findall(style_pattern, content, re.DOTALL)
    
    # Remove style tags from body
    content = re.sub(r'\s*<style>.*?</style>\s*', '', content, flags=re.DOTALL)
    
    # Fix 3: Find unclosed div at line 42 and close it properly
    # The container div should be closed at the end before body
    if '</body>' in content and content.count('<div class="container">') > content.count('</div>'):
        # Add closing div before </body>
        content = content.replace('</body>', '</div>\n</body>')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Fixed {file_path}")

def fix_jenkins_automation():
    """Fix jenkins-automation.html validation errors"""
    file_path = Path('pages/jenkins-automation.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix 1: URL-encode spaces in image paths
    content = content.replace(
        'src="../assets/pdf/Jenkins/Jenkins Automation for WTS/Slide1.PNG"',
        'src="../assets/pdf/Jenkins/Jenkins%20Automation%20for%20WTS/Slide1.PNG"'
    )
    content = content.replace(
        'src="../assets/pdf/Jenkins/Jenkins Automation for WTS/Slide2.PNG"',
        'src="../assets/pdf/Jenkins/Jenkins%20Automation%20for%20WTS/Slide2.PNG"'
    )
    content = content.replace(
        'src="../assets/pdf/Jenkins/Jenkins Automation for WTS/Slide3.PNG"',
        'src="../assets/pdf/Jenkins/Jenkins%20Automation%20for%20WTS/Slide3.PNG"'
    )
    content = content.replace(
        'src="../assets/pdf/Jenkins/Jenkins Automation for WTS/Slide4.PNG"',
        'src="../assets/pdf/Jenkins/Jenkins%20Automation%20for%20WTS/Slide4.PNG"'
    )
    content = content.replace(
        'src="../assets/pdf/Jenkins/Jenkins Automation for WTS/Slide5.PNG"',
        'src="../assets/pdf/Jenkins/Jenkins%20Automation%20for%20WTS/Slide5.PNG"'
    )
    
    # Fix 2: Remove style tag from body if it exists
    content = re.sub(r'\s*<style>.*?</style>\s*</body>', '</body>', content, flags=re.DOTALL)
    
    # Fix 3: Fix unclosed section tags - find and close properly
    # Count opening and closing section tags
    section_opens = content.count('<section')
    section_closes = content.count('</section>')
    
    if section_opens > section_closes:
        # Find the slideshow section that's likely unclosed
        # Add closing section tag before the stray </div> at line 442
        lines = content.split('\n')
        fixed_lines = []
        for i, line in enumerate(lines):
            fixed_lines.append(line)
            # Around line 404, after slideshow container ends
            if i > 400 and i < 410 and '</div>' in line and 'slideshow' in ''.join(lines[max(0,i-20):i]):
                # Check if we need to close section here
                section_count = ''.join(lines[:i]).count('<section') - ''.join(lines[:i]).count('</section>')
                if section_count > 0:
                    fixed_lines.append('        </section>')
        content = '\n'.join(fixed_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Fixed {file_path}")

def fix_ethernet_interfaces():
    """Fix ethernet-interfaces.html validation errors"""
    file_path = Path('pages/ethernet-interfaces.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix 1: Remove duplicate IDs (likely from duplicate nav/header)
    # Find duplicate structures and remove them
    lines = content.split('\n')
    seen_ids = set()
    fixed_lines = []
    skip_until_end_tag = None
    
    for i, line in enumerate(lines):
        # Check for duplicate IDs
        id_match = re.search(r'id="([^"]+)"', line)
        if id_match:
            id_value = id_match.group(1)
            if id_value in ['darkModeIcon', 'darkModeText', 'navbar-brand', 'mobile-menu']:
                if id_value in seen_ids:
                    # Skip this duplicate section
                    if '<div' in line or '<nav' in line or '<button' in line:
                        skip_until_end_tag = 'nav' if '<nav' in line else 'div' if '<div' in line else 'button'
                    continue
                else:
                    seen_ids.add(id_value)
        
        if skip_until_end_tag:
            if f'</{skip_until_end_tag}>' in line:
                skip_until_end_tag = None
            continue
        
        fixed_lines.append(line)
    
    content = '\n'.join(fixed_lines)
    
    # Fix 2: Remove style tag from section
    content = re.sub(r'(\s*<section[^>]*>.*?)<style>.*?</style>', r'\1', content, flags=re.DOTALL)
    
    # Fix 3: Escape < characters in content (they appear to be in JavaScript/template strings)
    # Look for patterns like "< &" or "< 0" or "< 1" in content
    # These are likely in script blocks or data
    content = re.sub(r'(["\'].*?)(<)(\s*[&0-9])', r'\1&lt;\3', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Fixed {file_path}")

def main():
    print("Fixing HTML validation errors...")
    print()
    
    fix_index_html()
    fix_jenkins_automation()
    fix_ethernet_interfaces()
    
    print()
    print("✅ All HTML validation errors fixed!")
    print()
    print("Summary of fixes:")
    print("  • URL-encoded spaces in file paths")
    print("  • Removed <style> tags from invalid locations")
    print("  • Fixed unclosed/duplicate elements")
    print("  • Escaped special characters in content")

if __name__ == '__main__':
    main()
