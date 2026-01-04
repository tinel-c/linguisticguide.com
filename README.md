# LinguisticGuide.com - Professional Translator Website

A modern, single-page website for a professional translator showcasing services, expertise, and portfolio.

## 🚀 Features

- **Modern Design**: State-of-the-art, responsive layout
- **Performance Optimized**: Fast loading, optimized images, efficient code
- **Accessible**: WCAG 2.1 AA compliant
- **SEO Ready**: Semantic HTML, meta tags, structured data
- **Mobile-First**: Fully responsive across all devices
- **No Backend Required**: Static site with programmatic content updates
- **Multi-language Support**: English, German, and Romanian supported via a central CSV file

## 📋 Prerequisites

- Node.js 18+ and npm
- Modern web browser
- Text editor (VS Code recommended)

## 🛠️ Installation

1. Clone or navigate to the project directory:
```bash
cd linguisticguide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📂 Project Structure

```
linguisticguide/
├── src/                    # Source files
│   ├── assets/            # Images, fonts, icons
│   ├── styles/            # CSS files
│   ├── scripts/           # JavaScript modules
│   └── index.html         # Main HTML file
├── public/                # Static assets
├── dist/                  # Production build (generated)
├── docs/                  # Documentation
├── PROJECT_RULES.md       # Development guidelines
├── package.json           # Dependencies
├── vite.config.js         # Build configuration
└── README.md             # This file
```

## 🎨 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint JavaScript files
- `npm run format` - Format code with Prettier

### Content & Translation Updates

All website text and translations are managed through `src/assets/translations.csv`. 

**To update content:**
1. Open `src/assets/translations.csv` (using Excel, VS Code, or any CSV editor).
2. Edit the text in the `en` (English), `de` (German), or `ro` (Romanian) columns.
3. Save the file.
4. Run `npm run build` to generate the updated production site.

The website uses a custom i18n engine (`src/scripts/i18n.js`) to dynamically load these translations.

## 🏗️ Building for Production

1. Build the project:
```bash
npm run build
```

2. Test the production build:
```bash
npm run preview
```

3. Deploy the `dist/` folder to your hosting provider

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✅ Quality Checklist

Before deploying, ensure:
- [ ] Lighthouse score 90+ in all categories
- [ ] All images optimized (WebP format)
- [ ] Accessibility tested (WAVE, axe DevTools)
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Contact form working
- [ ] All links functional
- [ ] SEO meta tags configured

## 📖 Documentation

For detailed development guidelines, see [PROJECT_RULES.md](PROJECT_RULES.md)

## 🔧 Customization

### Colors
Update CSS custom properties in `src/styles/base/variables.css`

### Content
Edit configuration files in `src/scripts/config/`

### Images
Add optimized images to `src/assets/images/`

### Fonts
Configure fonts in `src/styles/base/typography.css`

## 🚀 Deployment

This site can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting provider

Simply upload the contents of the `dist/` folder after building.

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a private project for linguisticguide.com. For questions or updates, refer to PROJECT_RULES.md.

---

**Last Updated**: January 4, 2026

