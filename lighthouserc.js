module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/services',
        'http://localhost:8080/about',
        'http://localhost:8080/contact',
        'http://localhost:8080/blog',
        'http://localhost:8080/blog/first-post',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};