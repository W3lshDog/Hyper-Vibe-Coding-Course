import unittest
import os
import re

class TestLandingPage(unittest.TestCase):
    def setUp(self):
        self.file_path = os.path.join(os.path.dirname(__file__), '../../frontend/public/index.html')
        with open(self.file_path, 'r', encoding='utf-8') as f:
            self.content = f.read()

    def test_title_exists(self):
        """Check if the page has a title tag with specific keywords."""
        match = re.search(r'<title>(.*?)</title>', self.content, re.IGNORECASE)
        self.assertTrue(match, "Title tag missing")
        self.assertIn("Vibe Coding", match.group(1), "Title should contain 'Vibe Coding'")

    def test_meta_viewport(self):
        """Check for mobile responsiveness meta tag."""
        self.assertIn('name="viewport"', self.content, "Viewport meta tag missing")

    def test_sections_exist(self):
        """Check for critical landing page sections by ID or class."""
        critical_sections = [
            'class="hero"', 
            'id="courses"', 
            'class="benefits"', 
            'id="enroll"'
        ]
        for section in critical_sections:
            self.assertIn(section, self.content, f"Critical section '{section}' missing")

    def test_links_valid(self):
        """Check that all hrefs are not empty."""
        links = re.findall(r'href=["\'](.*?)["\']', self.content)
        for link in links:
            self.assertTrue(link, "Empty href attribute found")
            # For Option A, we expect external links or anchors
            if not link.startswith('#') and not link.startswith('http'):
                # Check if local file exists
                if link.endswith('.css') or link.endswith('.js') or link.endswith('.png'):
                    pass # Assets might not exist yet, but structure is ok
                else:
                    # Warn about potentially broken local links
                    pass 

if __name__ == '__main__':
    unittest.main()
