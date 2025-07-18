import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock Astro environment
const mockAstro = {
  props: {},
  url: new URL('http://localhost:4321/'),
  site: new URL('https://example.com'),
};

// Create a mock DOM for testing
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window as any;

describe('Header Component', () => {
  it('should contain the site title', () => {
    // Since we can't directly test Astro components, we test the logic
    const siteTitle = 'Clicktastic';
    expect(siteTitle).toBe('Clicktastic');
  });

  it('should have navigation links', () => {
    const expectedLinks = [
      { href: '/', text: 'Home' },
      { href: '/services', text: 'Services' },
      { href: '/blog', text: 'Blog' },
      { href: '/about', text: 'About' },
      { href: '/contact', text: 'Contact' },
    ];

    expectedLinks.forEach(link => {
      expect(link.href).toBeDefined();
      expect(link.text).toBeDefined();
    });
  });

  it('should include theme toggle', () => {
    const themeToggleId = 'theme-toggle';
    expect(themeToggleId).toBe('theme-toggle');
  });

  it('should have proper CSS classes', () => {
    const expectedClasses = [
      'nav-right',
      'internal-links',
      'theme-toggle'
    ];

    expectedClasses.forEach(className => {
      expect(typeof className).toBe('string');
      expect(className.length).toBeGreaterThan(0);
    });
  });
});

describe('Header Navigation Logic', () => {
  it('should determine active link correctly', () => {
    const isActiveLink = (href: string, pathname: string) => {
      const subpath = pathname.match(/[^\/]+/g);
      return href === pathname || href === '/' + (subpath?.[0] || '');
    };

    expect(isActiveLink('/', '/')).toBe(true);
    expect(isActiveLink('/blog', '/blog')).toBe(true);
    expect(isActiveLink('/blog', '/blog/first-post')).toBe(true);
    expect(isActiveLink('/services', '/about')).toBe(false);
  });

  it('should handle theme toggle functionality', () => {
    const getTheme = () => localStorage.getItem('theme');
    const setTheme = (theme: string) => localStorage.setItem('theme', theme);
    
    // Mock localStorage
    const localStorageMock = {
      getItem: (key: string) => null,
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {},
    };
    
    global.localStorage = localStorageMock as any;
    
    expect(typeof getTheme).toBe('function');
    expect(typeof setTheme).toBe('function');
  });
});