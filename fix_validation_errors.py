#!/usr/bin/env python3
"""Fix HTML validation errors identified by validator."""

import re
from pathlib import Path


def fix_index_html():
    """Fix unclosed div in index.html."""
    file_path = Path("index.html")
    content = file_path.read_text(encoding='utf-8')
    
    # The div.container opened at line 42 needs to be closed before </body>
    # Find the </body> tag and add </div> before it
    content = content.replace('</body>', '    </div>\n</body>')
    
    file_path.write_text(content, encoding='utf-8')
    print("Fixed index.html: Added closing </div> before </body>")


def fix_jenkins_automation_html():
    """Fix unclosed section and stray divs in jenkins-automation.html."""
    file_path = Path("pages/jenkins-automation.html")
    content = file_path.read_text(encoding='utf-8')
    
    # Find the Resources section that's missing a closing tag
    # Pattern: section id="resources" ... needs closing </section>
    # The issue is at line 301 - unclosed section, line 404 has </div> but section not closed
    # Line 442 has stray </div>
    
    # Find the Resources section and close it properly
    # The section starts at line 301 and needs to close before the Key Benefits section at line 407
    pattern = r'(<!-- Resources Section -->.*?</div>\s*</div>\s*</div>\s*</div>)(\s*<!-- Key Benefits Section -->)'
    replacement = r'\1\n        </section>\n\n\2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Remove the stray </div> at line 442 (after the Key Benefits section closes)
    # Look for pattern: </section>\n\n    \n        <!-- Footer -->
    # Replace with: </section>\n\n        <!-- Footer -->
    content = re.sub(r'(</section>)\s+\n    \n(        <!-- Footer -->)', r'\1\n\n\2', content)
    
    file_path.write_text(content, encoding='utf-8')
    print("Fixed jenkins-automation.html: Closed unclosed section and removed stray div")


def fix_ethernet_interfaces_html():
    """Fix stray </a> tag and unescaped special characters in ethernet-interfaces.html."""
    file_path = Path("pages/ethernet-interfaces.html")
    content = file_path.read_text(encoding='utf-8')
    
    # Fix stray </a> tag at line 3310
    # This is right after the closing </a> of the logo link
    # Pattern: </a>\n            <button class="mobile-menu-toggle"
    # But there's likely an extra </a> before it
    content = re.sub(r'</a>\s*</a>\s*<button class="mobile-menu-toggle"', 
                     '</a>\n            <button class="mobile-menu-toggle"', content)
    
    # Fix unescaped special characters (<, >, &) in DTS code blocks
    # These appear in patterns like:
    # reg = <0xc>;
    # phy-handle = <&phy0>;
    # ti,rx-internal-delay = <0x8>;
    
    def escape_code_block(match):
        """Escape special characters within code blocks."""
        code = match.group(0)
        # Preserve the opening and closing tags
        tag_match = re.match(r'(<[^>]+>)(.*?)(</[^>]+>)', code, flags=re.DOTALL)
        if not tag_match:
            return code
        
        opening_tag = tag_match.group(1)
        code_content = tag_match.group(2)
        closing_tag = tag_match.group(3)
        
        # Escape special characters in the content
        # & must be escaped first to avoid double-escaping
        code_content = code_content.replace('&', '&amp;')
        code_content = code_content.replace('<', '&lt;')
        code_content = code_content.replace('>', '&gt;')
        
        # Unescape HTML entities that were already properly escaped
        code_content = re.sub(r'&amp;lt;', '&lt;', code_content)
        code_content = re.sub(r'&amp;gt;', '&gt;', code_content)
        code_content = re.sub(r'&amp;amp;', '&amp;', code_content)
        
        return opening_tag + code_content + closing_tag
    
    # Find all code blocks and escape special characters
    content = re.sub(r'<code[^>]*>.*?</code>', escape_code_block, content, flags=re.DOTALL)
    content = re.sub(r'<pre[^>]*>.*?</pre>', escape_code_block, content, flags=re.DOTALL)
    
    file_path.write_text(content, encoding='utf-8')
    print("Fixed ethernet-interfaces.html: Removed stray </a> and escaped special characters in code blocks")


def main():
    """Main function to fix all validation errors."""
    print("Fixing HTML validation errors...\n")
    
    fix_index_html()
    fix_jenkins_automation_html()
    fix_ethernet_interfaces_html()
    
    print("\n✅ All validation errors fixed!")
    print("\nNext steps:")
    print("1. Run: npm run validate:html")
    print("2. Verify all errors are resolved")
    print("3. Commit and push changes")


if __name__ == "__main__":
    main()
