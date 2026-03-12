import unittest
import os
from bs4 import BeautifulSoup

class TestLandingPage(unittest.TestCase):
    def setUp(self):
        self.file_path = os.path.join(os.path.dirname(__file__), '../../frontend/public/index.html')
        with open(self.file_path, 'r', encoding='utf-8') as f:
            self.content = f.read()
        self.soup = BeautifulSoup(self.content, 'lxml')

    def test_title_exists(self):
        """Check if the page has a title tag with specific keywords."""
        title_tag = self.soup.find('title')
        self.assertIsNotNone(title_tag, "Title tag missing")
        self.assertIn("Vibe Coding", title_tag.string, "Title should contain 'Vibe Coding'")

    def test_meta_viewport(self):
        """Check for mobile responsiveness meta tag."""
        viewport_tag = self.soup.find('meta', attrs={'name': 'viewport'})
        self.assertIsNotNone(viewport_tag, "Viewport meta tag missing")

    def test_sections_exist(self):
        """Check for critical landing page sections by ID or class."""
        critical_selectors = [
            '.hero',
            '#courses',
            '.benefits',
            '#enroll'
        ]
        for selector in critical_selectors:
            element = self.soup.select_one(selector)
            self.assertIsNotNone(element, f"Critical section '{selector}' missing")

    def test_cta_links_valid(self):
        """Check that main CTA buttons have valid links."""
        cta_buttons = self.soup.select('.btn')
        self.assertTrue(len(cta_buttons) > 0, "No CTA buttons found")
        
        for btn in cta_buttons:
            href = btn.get('href')
            self.assertIsNotNone(href, "Button missing href attribute")
            self.assertTrue(href.startswith('#') or href.startswith('http'), f"Invalid link: {href}")

    def test_analytics_present(self):
        """Check if Plausible analytics script is present."""
        script = self.soup.find('script', attrs={'data-domain': 'w3lshdog.github.io'})
        self.assertIsNotNone(script, "Analytics script missing")
        self.assertIn('plausible.io', script['src'], "Wrong analytics source")

if __name__ == '__main__':
    unittest.main()
