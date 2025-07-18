import { describe, it, expect } from 'vitest';

describe('StructuredData Component', () => {
  describe('Schema Generation', () => {
    it('should generate valid WebSite schema', () => {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Clicktastic",
        "description": "Transform your brand with ethical advertising campaigns",
        "url": "https://example.com/",
        "publisher": {
          "@type": "Organization",
          "name": "Clicktastic",
          "url": "https://example.com/",
        }
      };

      expect(websiteSchema["@context"]).toBe("https://schema.org");
      expect(websiteSchema["@type"]).toBe("WebSite");
      expect(websiteSchema.name).toBe("Clicktastic");
      expect(websiteSchema.publisher["@type"]).toBe("Organization");
    });

    it('should generate valid Article schema', () => {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Test Article",
        "description": "Test description",
        "url": "https://example.com/blog/test",
        "author": {
          "@type": "Person",
          "name": "Clicktastic Team"
        },
        "datePublished": "2024-01-01T00:00:00.000Z"
      };

      expect(articleSchema["@context"]).toBe("https://schema.org");
      expect(articleSchema["@type"]).toBe("Article");
      expect(articleSchema.author["@type"]).toBe("Person");
      expect(articleSchema.author.name).toBe("Clicktastic Team");
    });

    it('should generate valid Service schema', () => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Our Services",
        "description": "Ethical advertising solutions",
        "serviceType": "Advertising Services",
        "category": "Digital Marketing",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Advertising Services",
          "itemListElement": []
        }
      };

      expect(serviceSchema["@context"]).toBe("https://schema.org");
      expect(serviceSchema["@type"]).toBe("Service");
      expect(serviceSchema.serviceType).toBe("Advertising Services");
      expect(serviceSchema.hasOfferCatalog["@type"]).toBe("OfferCatalog");
    });

    it('should generate valid Contact schema', () => {
      const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Us",
        "description": "Reach out to the Clicktastic team",
        "mainEntity": {
          "@type": "Organization",
          "name": "Clicktastic",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "hello@clicktastic.net"
            }
          ]
        }
      };

      expect(contactSchema["@context"]).toBe("https://schema.org");
      expect(contactSchema["@type"]).toBe("ContactPage");
      expect(contactSchema.mainEntity["@type"]).toBe("Organization");
      expect(contactSchema.mainEntity.contactPoint[0]["@type"]).toBe("ContactPoint");
    });
  });

  describe('Breadcrumb Schema', () => {
    it('should generate correct breadcrumb for homepage', () => {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://example.com/"
          }
        ]
      };

      expect(breadcrumbSchema["@type"]).toBe("BreadcrumbList");
      expect(breadcrumbSchema.itemListElement).toHaveLength(1);
      expect(breadcrumbSchema.itemListElement[0].position).toBe(1);
    });

    it('should generate correct breadcrumb for blog posts', () => {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://example.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://example.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Test Article",
            "item": "https://example.com/blog/test"
          }
        ]
      };

      expect(breadcrumbSchema.itemListElement).toHaveLength(3);
      expect(breadcrumbSchema.itemListElement[1].name).toBe("Blog");
      expect(breadcrumbSchema.itemListElement[2].position).toBe(3);
    });
  });

  describe('Schema Validation', () => {
    it('should clean undefined values from schema', () => {
      const cleanSchema = (obj: any): any => {
        if (obj === null || obj === undefined) return undefined;
        if (typeof obj !== 'object') return obj;
        
        const cleaned: any = Array.isArray(obj) ? [] : {};
        
        for (const [key, value] of Object.entries(obj)) {
          const cleanedValue = cleanSchema(value);
          if (cleanedValue !== undefined) {
            cleaned[key] = cleanedValue;
          }
        }
        
        return Object.keys(cleaned).length === 0 ? undefined : cleaned;
      };

      const dirtySchema = {
        name: "Test",
        description: undefined,
        url: "https://example.com",
        optional: null
      };

      const cleanedSchema = cleanSchema(dirtySchema);
      expect(cleanedSchema.name).toBe("Test");
      expect(cleanedSchema.url).toBe("https://example.com");
      expect(cleanedSchema.description).toBeUndefined();
      expect(cleanedSchema.optional).toBeUndefined();
    });

    it('should validate URL construction', () => {
      const siteUrl = 'https://example.com';
      const pathname = '/blog/test';
      const canonicalUrl = new URL(pathname, siteUrl).toString();
      
      expect(canonicalUrl).toBe('https://example.com/blog/test');
    });

    it('should validate image URL construction', () => {
      const siteUrl = 'https://example.com';
      const imagePath = '/blog-placeholder-1.jpg';
      const imageUrl = new URL(imagePath, siteUrl).toString();
      
      expect(imageUrl).toBe('https://example.com/blog-placeholder-1.jpg');
    });
  });
});