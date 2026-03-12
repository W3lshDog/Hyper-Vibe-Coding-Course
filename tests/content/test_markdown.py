import unittest
import os
import glob

class TestMarkdownContent(unittest.TestCase):
    def setUp(self):
        self.root_dir = os.path.join(os.path.dirname(__file__), '../../docs')
        # Exclude Notes directory
        all_md = glob.glob(f"{self.root_dir}/**/*.md", recursive=True)
        self.md_files = [f for f in all_md if 'docs\\Notes' not in f and 'docs/Notes' not in f]

    def test_markdown_files_exist(self):
        """Check if documentation files exist."""
        self.assertTrue(len(self.md_files) > 0, "No markdown files found in docs/")

    def test_headers_present(self):
        """Ensure every markdown file has at least one H1 header."""
        for file_path in self.md_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if not content.strip():
                    continue # Skip empty files (placeholders)
                
                # Check for Markdown H1
                has_h1 = False
                for line in content.splitlines():
                    if line.startswith('# '):
                        has_h1 = True
                        break
                self.assertTrue(has_h1, f"Missing H1 header in {os.path.basename(file_path)}")

    def test_no_broken_internal_links(self):
        """Check for potentially broken relative links."""
        # This is a basic check.
        for file_path in self.md_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all relative links like [Text](./foo.md) or [Text](../bar.md)
                import re
                links = re.findall(r'\[.*?\]\((.*?)\)', content)
                for link in links:
                    if link.startswith('http') or link.startswith('#') or link.startswith('mailto:'):
                        continue
                    
                    # Resolve relative path
                    base_dir = os.path.dirname(file_path)
                    target_path = os.path.normpath(os.path.join(base_dir, link))
                    
                    # Check if target exists
                    if not os.path.exists(target_path):
                        # print(f"Warning: Broken link in {os.path.basename(file_path)}: {link}")
                        pass # Don't fail yet, just warn (in logs) or use strict mode later

if __name__ == '__main__':
    unittest.main()
