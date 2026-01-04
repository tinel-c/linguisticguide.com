# LinguisticGuide.com - Project Rules & Development Guidelines

## Project Overview
**Website**: linguisticguide.com  
**Type**: Single-page professional translator portfolio/service website  
**Tech Stack**: Modern HTML5, CSS3, JavaScript (Vanilla/Framework TBD)  
**Backend**: None required - static site with programmatic content generation  
**Target**: State-of-the-art, modern, responsive design

---

## Core Development Principles

### 1. Design Philosophy
- **Mobile-First**: Design for mobile, scale up to desktop
- **Performance-First**: Optimize for Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Accessibility**: WCAG 2.1 AA compliance minimum
- **Modern Aesthetics**: Clean, professional, minimalist design with strategic use of white space
- **User Experience**: Intuitive navigation, clear CTAs, smooth animations

### 2. Technology Stack

#### Core Technologies
- **HTML5**: Semantic markup, proper heading hierarchy
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties, Container Queries)
- **JavaScript**: ES6+ modules, async/await patterns
- **Build Tools**: Vite or Parcel for development and bundling
- **Version Control**: Git with semantic commit messages

#### Recommended Libraries
- **Animation**: GSAP or Framer Motion for smooth, professional animations
- **Icons**: Lucide Icons or Heroicons (SVG-based)
- **Fonts**: Google Fonts (Inter, Poppins, or Playfair Display for headings)
- **Image Optimization**: WebP format with fallbacks, lazy loading
- **Form Handling**: Native validation with progressive enhancement

### 3. Folder Structure Rules

```
/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   ├── images/        # Optimized images (WebP, PNG, SVG)
│   │   ├── fonts/         # Custom fonts if needed
│   │   └── icons/         # SVG icons
│   ├── styles/            # CSS/SCSS files
│   │   ├── base/          # Reset, variables, typography
│   │   ├── components/    # Component-specific styles
│   │   ├── layout/        # Layout styles (header, footer, grid)
│   │   └── main.css       # Main stylesheet entry point
│   ├── scripts/           # JavaScript modules
│   │   ├── components/    # Component logic
│   │   ├── utils/         # Utility functions
│   │   └── main.js        # Main entry point
│   └── index.html         # Main HTML file
├── public/                # Public assets (copied as-is)
├── dist/                  # Production build output (gitignored)
├── docs/                  # Documentation
├── .gitignore
├── package.json
├── vite.config.js         # Build configuration
└── README.md
```

### 4. Content Structure (Single Page Sections)

The website should include these sections in order:

1. **Hero Section**
   - Compelling headline
   - Professional photo or illustration
   - Clear value proposition
   - Primary CTA button

2. **About/Introduction**
   - Brief bio
   - Expertise areas
   - Years of experience
   - Professional credentials

3. **Services**
   - Translation services offered
   - Language pairs
   - Specializations (legal, medical, technical, etc.)
   - Pricing models (if applicable)

4. **Portfolio/Experience**
   - Notable projects (anonymized if needed)
   - Client testimonials
   - Industry experience
   - Certifications

5. **Process/How It Works**
   - Step-by-step workflow
   - Timeline expectations
   - Quality assurance methods

6. **Contact Section**
   - Contact form
   - Email address
   - Phone (optional)
   - Social media links
   - Response time expectations

7. **Footer**
   - Copyright
   - Privacy policy link
   - Terms of service link
   - Additional navigation

### 5. Design Guidelines

#### Color Palette
- Use a professional, trust-inspiring palette
- Suggested: Deep blue/navy (trust) + warm accent (approachability)
- Maximum 3-4 colors + neutrals
- Ensure 4.5:1 contrast ratio for text

#### Typography
- Maximum 2 font families
- Heading font: Modern serif or bold sans-serif
- Body font: Highly readable sans-serif
- Font sizes: Fluid typography using clamp()
- Line height: 1.5-1.7 for body text

#### Spacing
- Use consistent spacing scale (8px base or 4px)
- Generous white space
- Clear visual hierarchy

#### Images
- High-quality, professional images
- WebP format with PNG/JPG fallbacks
- Responsive images using srcset
- Lazy loading for below-fold images
- Alt text for all images

#### Animations
- Subtle, purposeful animations
- Respect prefers-reduced-motion
- Smooth scroll behavior
- Intersection Observer for scroll-triggered animations
- Maximum 300-400ms duration for micro-interactions

### 6. Performance Requirements

- **Lighthouse Score**: 90+ across all categories
- **Page Weight**: < 1MB initial load
- **Image Optimization**: All images compressed and properly sized
- **Code Splitting**: Lazy load non-critical resources
- **Caching Strategy**: Implement proper cache headers
- **CDN**: Consider using CDN for assets

### 7. SEO Requirements

- Semantic HTML5 elements
- Proper meta tags (title, description, OG tags)
- Structured data (JSON-LD for Person/Service)
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Alt text for all images
- Descriptive link text

### 8. Accessibility Requirements

- Keyboard navigation support
- ARIA labels where needed
- Focus indicators
- Skip to main content link
- Sufficient color contrast
- Responsive text sizing
- Screen reader friendly

### 9. Browser Support

- Last 2 versions of major browsers
- Chrome, Firefox, Safari, Edge
- Mobile Safari and Chrome
- Graceful degradation for older browsers

### 10. Development Workflow

#### Phase 1: Setup & Planning
1. Initialize project structure
2. Set up version control
3. Install dependencies
4. Create design mockups/wireframes
5. Gather content and assets

#### Phase 2: Development
1. Build HTML structure (semantic, accessible)
2. Implement base styles (variables, reset, typography)
3. Develop components (mobile-first)
4. Add interactivity with JavaScript
5. Optimize images and assets
6. Test across devices and browsers

#### Phase 3: Optimization
1. Run Lighthouse audits
2. Optimize performance
3. Validate HTML/CSS
4. Test accessibility
5. Cross-browser testing
6. Mobile device testing

#### Phase 4: Deployment
1. Build production version
2. Test production build locally
3. Deploy to hosting
4. Configure DNS
5. Set up SSL certificate
6. Monitor performance

### 11. Code Quality Standards

#### HTML
- Use semantic elements
- Validate with W3C validator
- Proper nesting and indentation
- Meaningful class names (BEM methodology)

#### CSS
- Mobile-first approach
- Use CSS custom properties for theming
- Avoid !important
- Organize by component/section
- Use modern layout techniques (Grid, Flexbox)
- Comment complex selectors

#### JavaScript
- Use ES6+ features
- Modular code structure
- Avoid global variables
- Error handling
- Comment complex logic
- Use async/await for asynchronous operations

### 12. Content Guidelines

- **Tone**: Professional, confident, approachable
- **Language**: Clear, concise, jargon-free
- **CTAs**: Action-oriented, specific
- **Testimonials**: Real, specific, credible
- **Portfolio**: Results-focused, quantifiable when possible

### 13. Security Considerations

- Sanitize form inputs
- Implement CSRF protection for forms
- Use HTTPS only
- Content Security Policy headers
- No sensitive data in client-side code

### 14. Testing Checklist

- [ ] Mobile responsiveness (320px to 2560px)
- [ ] Cross-browser compatibility
- [ ] Accessibility (WAVE, axe DevTools)
- [ ] Performance (Lighthouse, WebPageTest)
- [ ] SEO (Google Search Console)
- [ ] Forms validation and submission
- [ ] All links working
- [ ] Images loading properly
- [ ] Animations smooth and purposeful
- [ ] Contact form working

### 15. Maintenance & Updates

- Keep dependencies updated
- Regular security audits
- Monitor performance metrics
- Update content programmatically via JSON/config files
- Version control for all changes
- Backup before major updates

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## Resources & References

- [Web.dev Best Practices](https://web.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/)

---

## Contact & Support

For questions or clarifications about this project, refer to this document first.
Update this document as the project evolves and new decisions are made.

**Last Updated**: December 29, 2025

