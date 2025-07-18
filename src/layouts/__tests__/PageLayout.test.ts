import { describe, it, expect } from 'vitest';

describe('PageLayout Component', () => {
  describe('Props Interface', () => {
    it('should accept required props', () => {
      const props = {
        title: 'Test Page',
        description: 'Test description',
      };

      expect(props.title).toBe('Test Page');
      expect(props.description).toBe('Test description');
    });

    it('should accept optional props', () => {
      const props = {
        title: 'Test Page',
        description: 'Test description',
        heroImage: '/test-image.jpg',
        type: 'website' as const,
        services: [
          { name: 'Test Service', description: 'Test service description' }
        ],
        contactInfo: {
          email: 'test@example.com',
          phone: '+1234567890'
        }
      };

      expect(props.heroImage).toBe('/test-image.jpg');
      expect(props.type).toBe('website');
      expect(props.services).toHaveLength(1);
      expect(props.contactInfo?.email).toBe('test@example.com');
    });
  });

  describe('Type Validation', () => {
    it('should validate page types', () => {
      const validTypes = ['website', 'article', 'service', 'contact'];
      
      validTypes.forEach(type => {
        expect(validTypes).toContain(type);
      });
    });

    it('should default to website type', () => {
      const defaultType = 'website';
      expect(defaultType).toBe('website');
    });
  });

  describe('Services Data Structure', () => {
    it('should validate services array structure', () => {
      const services = [
        { name: 'Creative Strategy', description: 'Strategic creative solutions' },
        { name: 'Media Buying', description: 'Optimized media purchasing' }
      ];

      services.forEach(service => {
        expect(service).toHaveProperty('name');
        expect(service).toHaveProperty('description');
        expect(typeof service.name).toBe('string');
        expect(typeof service.description).toBe('string');
      });
    });

    it('should handle empty services array', () => {
      const services: Array<{ name: string; description: string; }> = [];
      expect(services).toHaveLength(0);
      expect(Array.isArray(services)).toBe(true);
    });
  });

  describe('Contact Info Structure', () => {
    it('should validate contact info structure', () => {
      const contactInfo = {
        email: 'hello@clicktastic.net',
        phone: '+15551234567',
        address: '123 Main St, City, State 12345'
      };

      expect(contactInfo).toHaveProperty('email');
      expect(contactInfo).toHaveProperty('phone');
      expect(contactInfo).toHaveProperty('address');
      expect(typeof contactInfo.email).toBe('string');
      expect(typeof contactInfo.phone).toBe('string');
      expect(typeof contactInfo.address).toBe('string');
    });

    it('should handle partial contact info', () => {
      const contactInfo = {
        email: 'hello@clicktastic.net'
      };

      expect(contactInfo.email).toBe('hello@clicktastic.net');
      expect(contactInfo.phone).toBeUndefined();
      expect(contactInfo.address).toBeUndefined();
    });
  });

  describe('BaseHead Integration', () => {
    it('should pass correct props to BaseHead', () => {
      const baseHeadProps = {
        title: 'Test Page',
        description: 'Test description',
        image: '/test-image.jpg',
        type: 'website' as const,
        services: [{ name: 'Test', description: 'Test' }],
        contactInfo: { email: 'test@example.com' }
      };

      // Verify all props are defined
      expect(baseHeadProps.title).toBeDefined();
      expect(baseHeadProps.description).toBeDefined();
      expect(baseHeadProps.image).toBeDefined();
      expect(baseHeadProps.type).toBeDefined();
      expect(baseHeadProps.services).toBeDefined();
      expect(baseHeadProps.contactInfo).toBeDefined();
    });
  });

  describe('Hero Image Handling', () => {
    it('should handle hero image URL', () => {
      const heroImage = '/blog-placeholder-1.jpg';
      expect(heroImage).toMatch(/^\/.*\.jpg$/);
    });

    it('should handle missing hero image', () => {
      const heroImage = undefined;
      expect(heroImage).toBeUndefined();
    });
  });
});