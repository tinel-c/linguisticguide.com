# Content Update Guide

This guide explains how to update website content programmatically without touching the core code.

## Overview

Content is managed through configuration files in `src/scripts/config/`. This allows you to update text, images, and data without modifying HTML, CSS, or JavaScript logic.

## Updating Text Content

### Method 1: Configuration File (Recommended)

Edit `src/scripts/config/content.js`:

```javascript
export const siteConfig = {
  hero: {
    title: ['Your New', 'Headline Here'],
    description: 'Your new description...',
  },
  // ... more content
};
```

### Method 2: Direct HTML Edit

For quick changes, edit `src/index.html` directly:

```html
<h1 class="hero__title">
  <span class="hero__title-line">Your New Headline</span>
</h1>
```

## Updating Images

### 1. Add New Images

Place images in `src/assets/images/`:
- Use WebP format for best performance
- Provide PNG/JPG fallbacks
- Optimize images before adding (use TinyPNG, Squoosh, etc.)

### 2. Update Image References

In `src/index.html`:

```html
<img src="./assets/images/your-image.webp" alt="Description">
```

### 3. Recommended Image Sizes

- Hero image: 1200x800px
- Service icons: 64x64px (SVG preferred)
- Testimonial photos: 100x100px
- OG image: 1200x630px

## Updating Services

Edit the services array in `src/scripts/config/content.js`:

```javascript
services: [
  {
    id: 'service-id',
    title: 'Service Name',
    description: 'Service description...',
    icon: 'icon-name'
  },
  // Add more services
]
```

Then update the HTML in `src/index.html` to match.

## Updating Testimonials

Edit the testimonials array in `src/scripts/config/content.js`:

```javascript
testimonials: [
  {
    rating: 5,
    text: 'Testimonial text...',
    author: 'Client Name',
    position: 'Job Title, Company'
  },
  // Add more testimonials
]
```

## Updating Contact Information

### Email Address

Update in multiple places:
1. `src/scripts/config/content.js` - siteConfig.contact.email
2. `src/index.html` - mailto links
3. `package.json` - author field (optional)

### Social Media Links

Edit in `src/scripts/config/content.js`:

```javascript
social: {
  linkedin: 'https://linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle'
}
```

Update corresponding links in `src/index.html`.

## Updating Colors

Edit `src/styles/base/variables.css`:

```css
:root {
  --color-primary: #1e40af;      /* Main brand color */
  --color-accent: #f59e0b;       /* Accent color */
  /* ... more colors */
}
```

All components will automatically use the new colors.

## Updating Fonts

### Change Font Families

1. Update Google Fonts link in `src/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

2. Update CSS variables in `src/styles/base/variables.css`:

```css
:root {
  --font-primary: 'YourFont', sans-serif;
  --font-heading: 'YourHeadingFont', serif;
}
```

## Updating Meta Tags (SEO)

Edit `src/index.html` head section:

```html
<title>Your New Title</title>
<meta name="description" content="Your new description">
<meta property="og:title" content="Your New Title">
<meta property="og:description" content="Your new description">
```

## Adding New Sections

1. **Create HTML structure** in `src/index.html`:

```html
<section class="new-section section" id="new-section">
  <div class="container">
    <h2>New Section Title</h2>
    <!-- Content -->
  </div>
</section>
```

2. **Add styles** in `src/styles/components/sections.css`:

```css
.new-section {
  /* Your styles */
}
```

3. **Add navigation link** in header:

```html
<li class="nav__item">
  <a href="#new-section" class="nav__link">New Section</a>
</li>
```

## Updating Statistics

Edit the stats array in `src/scripts/config/content.js`:

```javascript
stats: [
  { number: 500, label: 'Projects Completed' },
  { number: 10, label: 'Years Experience' },
  { number: 8, label: 'Language Pairs' }
]
```

Update corresponding HTML in the about section.

## Testing After Updates

After making changes:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Check in browser:**
   - Visual appearance
   - Responsive design
   - All links work
   - Forms function

3. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Run Lighthouse audit:**
   - Open DevTools
   - Go to Lighthouse tab
   - Run audit

## Best Practices

1. **Always backup** before making changes
2. **Test locally** before deploying
3. **Optimize images** before adding
4. **Keep content concise** and scannable
5. **Maintain consistent** tone and style
6. **Update copyright year** annually
7. **Check mobile view** after changes
8. **Validate HTML** after structural changes

## Common Issues

### Images Not Showing
- Check file path is correct
- Verify image file exists
- Check file extension matches

### Styles Not Applying
- Clear browser cache
- Check CSS syntax
- Verify class names match

### Content Overflowing
- Check text length
- Adjust container width
- Use responsive units

## Quick Reference

| What to Update | Where to Edit |
|----------------|---------------|
| Text content | `src/index.html` or `src/scripts/config/content.js` |
| Images | `src/assets/images/` + update HTML |
| Colors | `src/styles/base/variables.css` |
| Fonts | `src/index.html` + `src/styles/base/variables.css` |
| Services | `src/scripts/config/content.js` + HTML |
| Contact info | `src/scripts/config/content.js` + HTML |
| Meta tags | `src/index.html` |

---

**Last Updated:** December 29, 2025

