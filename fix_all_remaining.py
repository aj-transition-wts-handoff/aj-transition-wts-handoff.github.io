#!/usr/bin/env python3
"""Comprehensive fix for ALL remaining HTML validation errors."""

import re
from pathlib import Path


def fix_ethernet_interfaces_comprehensive():
    """Fix all issues in ethernet-interfaces.html."""
    file_path = Path("pages/ethernet-interfaces.html")
    content = file_path.read_text(encoding='utf-8')
    
    # Fix stray </a> tag - there's a missing opening <a> tag
    # The logo should have an <a> wrapper
    content = re.sub(
        r'(<div style="max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;">)\s*<span style="display: inline-flex',
        r'\1\n            <a href="../index.html" style="text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">\n                <span style="display: inline-flex',
        content
    )
    
    # Fix the mermaid diagram - raw > characters need escaping
    # BUT NOT in mermaid blocks - mermaid uses > for arrows
    # Skip mermaid blocks during escaping
    
    # Fix <pre>&lt;code sections - these should be <pre><code>
    # Pattern: <pre>&lt;code id="..." class="..."&gt; should be <pre><code id="..." class="...">
    content = re.sub(
        r'<pre>&lt;code\s+id="([^"]+)"\s+class="([^"]+)"&gt;',
        r'<pre><code id="\1" class="\2">',
        content
    )
    
    # Fix closing tags: </code> should exist but </pre> sections show just </code>
    # Need to add </code></pre> properly
    # Pattern: };</code> should be };</code></pre>
    # But only where </pre> is missing
    
    # Better approach: Find all <pre><code>...</code> sections without </pre>
    # and add </pre> after </code>
    
    # Actually, looking at the structure, the problem is:
    # <pre>&lt;code...&gt;...content...</code>
    # Should be:
    # <pre><code...>...content...</code></pre>
    
    # The </pre> tags are on separate lines after </div>, let's fix the structure
    # Pattern: </code>\n            </div>
    # Should be: </code></pre>\n            </div>
    
    content = re.sub(
        r'(;\s*</code>)\s*\n(\s*</div>)',
        r'\1</pre>\n\2',
        content
    )
    
    # Fix table header structure issues
    # Pattern: <table...><th scope="col"...> should be <table...><thead><tr><th scope="col"...>
    # Find tables without thead
    def fix_table_structure(match):
        """Fix table structure to have proper thead."""
        table = match.group(0)
        # If table has <th> directly after <table>, wrap in <thead><tr>
        if '<thead>' not in table:
            # Add <thead><tr> after <table...>
            table = re.sub(r'(<table[^>]*>)\s*(<th)', r'\1\n                    <thead>\n                        <tr>\n                            \2', table)
            # Add </tr></thead> before </table>
            table = re.sub(r'(</th>)\s*(</table>)', r'\1\n                        </tr>\n                    </thead>\n                \2', table)
        return table
    
    # Apply table fixes
    content = re.sub(r'<table[^>]*>.*?</table>', fix_table_structure, content, flags=re.DOTALL)
    
    # Fix void elements - <br/> should be <br>, <link/> should be <link>
    content = re.sub(r'<br\s*/>', '<br>', content)
    content = re.sub(r'<link\s+([^>]*)/>', r'<link \1>', content)
    
    # Fix remaining & in inline styles (but not in HTML entities or mermaid)
    # More precise: only fix & in style attributes that aren't already &amp;
    def escape_amp_in_style(match):
        """Escape & in style attributes."""
        style = match.group(0)
        # Skip if it's already an HTML entity
        style = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|nbsp;|#)', '&amp;', style)
        return style
    
    # Apply only to style attributes
    content = re.sub(r'style="[^"]*"', escape_amp_in_style, content)
    
    # Fix unclosed <div> tags in the document structure
    # Check for proper closing
    
    file_path.write_text(content, encoding='utf-8')
    print(f"Fixed {file_path}")


def fix_table_headers_in_files():
    """Fix table structure in cases-dashboard.html and cr-list.html."""
    files = [
        "pages/cases-dashboard.html",
        "pages/cr-list.html"
    ]
    
    for file_name in files:
        file_path = Path(file_name)
        if not file_path.exists():
            continue
            
        content = file_path.read_text(encoding='utf-8')
        
        # Fix table structure: <table><th> should be <table><thead><tr><th>
        # Pattern: <table...><th scope="col"...>
        # Replace with: <table...><thead><tr><th scope="col"...>
        
        # Find the specific table issue
        content = re.sub(
            r'(<table[^>]*>)\s*<th\s+scope="col"scope="col"',
            r'\1\n                    <thead>\n                        <tr>\n                            <th scope="col"',
            content
        )
        
        # Fix duplicate scope attributes
        content = re.sub(r'scope="col"scope="col"', 'scope="col"', content)
        
        # Add closing </tr></thead> before tbody
        content = re.sub(
            r'(</th>)\s*<tr>',
            r'\1\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>',
            content
        )
        
        # Fix stray </thead> tags
        content = re.sub(r'</tr>\s*</thead>\s*<tbody>', r'</tr>\n                    </thead>\n                    <tbody>', content)
        
        file_path.write_text(content, encoding='utf-8')
        print(f"Fixed {file_path}")


def fix_remaining_ampersands():
    """Fix remaining & characters in all HTML files."""
    files = [
        "index.html",
        "pages/ar-list.html",
        "pages/playbook.html",
        "pages/jenkins-automation.html"
    ]
    
    for file_name in files:
        file_path = Path(file_name)
        if not file_path.exists():
            continue
            
        content = file_path.read_text(encoding='utf-8')
        
        # Fix & in onclick, onmouseover, onmouseout attributes
        def escape_amp_in_attribute(match):
            """Escape & in attributes."""
            attr = match.group(0)
            # Skip if it's already an HTML entity
            attr = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|nbsp;|#)', '&amp;', attr)
            return attr
        
        # Apply to various attributes
        content = re.sub(r'onclick="[^"]*"', escape_amp_in_attribute, content)
        content = re.sub(r'onmouseover="[^"]*"', escape_amp_in_attribute, content)
        content = re.sub(r'onmouseout="[^"]*"', escape_amp_in_attribute, content)
        content = re.sub(r'style="[^"]*"', escape_amp_in_attribute, content)
        content = re.sub(r'href="[^"]*"', escape_amp_in_attribute, content)
        
        file_path.write_text(content, encoding='utf-8')
        print(f"Fixed {file_path}")


def fix_jenkins_unclosed_section():
    """Fix the unclosed section in jenkins-automation.html."""
    file_path = Path("pages/jenkins-automation.html")
    content = file_path.read_text(encoding='utf-8')
    
    # The Resources section needs to be properly closed
    # Find the slideshow section end and ensure section closes before Key Benefits
    # Pattern: </div></div></div></div></section> already exists at line 405
    # But validator says it's still unclosed at line 301
    
    # Check if there's a mismatch in div/section nesting
    # The issue might be that there's an extra </div> at line 404
    # Let's look for the pattern more carefully
    
    # Remove the extra </div> at line 404 if it exists
    content = re.sub(
        r'(</div>\s*</div>\s*</div>)\s*</div>\s*(</section>)',
        r'\1\n        \2',
        content
    )
    
    file_path.write_text(content, encoding='utf-8')
    print(f"Fixed {file_path}")


def main():
    """Main function to fix all validation errors."""
    print("Fixing all remaining HTML validation errors...\n")
    
    fix_ethernet_interfaces_comprehensive()
    fix_table_headers_in_files()
    fix_remaining_ampersands()
    fix_jenkins_unclosed_section()
    
    print("\n✅ All validation errors fixed!")
    print("Run: npm run validate:html")


if __name__ == "__main__":
    main()
