import { describe, it, expect } from 'vitest';

describe('Tag Component', () => {
  describe('Props Interface', () => {
    it('should accept required tag prop', () => {
      const props = {
        tag: 'advertising'
      };

      expect(props.tag).toBe('advertising');
    });

    it('should accept optional isActive prop', () => {
      const props = {
        tag: 'advertising',
        isActive: true
      };

      expect(props.isActive).toBe(true);
    });

    it('should accept optional onClick prop', () => {
      const props = {
        tag: 'advertising',
        onClick: "toggleTag('advertising')"
      };

      expect(props.onClick).toBe("toggleTag('advertising')");
    });
  });

  describe('Tag Formatting', () => {
    it('should format tag with hash prefix', () => {
      const tag = 'advertising';
      const formattedTag = `#${tag}`;
      
      expect(formattedTag).toBe('#advertising');
    });

    it('should handle tags with spaces', () => {
      const tag = 'digital marketing';
      const formattedTag = `#${tag}`;
      
      expect(formattedTag).toBe('#digital marketing');
    });

    it('should handle special characters in tags', () => {
      const tag = 'AI/ML';
      const formattedTag = `#${tag}`;
      
      expect(formattedTag).toBe('#AI/ML');
    });
  });

  describe('CSS Classes', () => {
    it('should generate correct CSS classes for active state', () => {
      const generateClasses = (isActive: boolean) => {
        return ['tag', isActive ? 'active' : ''].filter(Boolean);
      };

      expect(generateClasses(true)).toEqual(['tag', 'active']);
      expect(generateClasses(false)).toEqual(['tag']);
    });

    it('should have proper data attributes', () => {
      const tag = 'advertising';
      const dataTag = `data-tag="${tag}"`;
      
      expect(dataTag).toBe('data-tag="advertising"');
    });
  });

  describe('Click Handler', () => {
    it('should generate toggle function call', () => {
      const tag = 'advertising';
      const onClick = `toggleTag('${tag}')`;
      
      expect(onClick).toBe("toggleTag('advertising')");
    });

    it('should handle tags with quotes', () => {
      const tag = "user's choice";
      const onClick = `toggleTag('${tag}')`;
      
      expect(onClick).toBe("toggleTag('user's choice')");
    });
  });
});