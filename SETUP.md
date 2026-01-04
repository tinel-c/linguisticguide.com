# LinguisticGuide.com - Quick Setup Guide

## 🚀 Getting Started

This guide will help you set up the development environment and start working on the linguisticguide.com website.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Git (for version control)

## Installation Steps

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Vite (build tool)
- GSAP (animation library)
- ESLint (code linting)
- Prettier (code formatting)

### 2. Start Development Server

```bash
npm run dev
```

This will:
- Start a local development server
- Open your browser to `http://localhost:3000`
- Enable hot module replacement (changes appear instantly)

### 3. View the Website

The browser should open automatically. If not, navigate to:
```
http://localhost:3000
```

## Project Structure

```
linguisticguide/
├── src/                        # Source files
│   ├── assets/                # Images, fonts, icons
│   │   ├── images/           # Image files
│   │   ├── fonts/            # Custom fonts
│   │   └── icons/            # SVG icons
│   ├── styles/               # CSS files
│   │   ├── base/            # Reset, variables, typography
│   │   ├── components/      # Component styles
│   │   ├── layout/          # Layout styles
│   │   └── main.css         # Main stylesheet
│   ├── scripts/             # JavaScript files
│   │   ├── components/      # Component logic
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Configuration files
│   │   └── main.js          # Main entry point
│   └── index.html           # Main HTML file
├── public/                   # Public assets
├── docs/                     # Documentation
├── PROJECT_RULES.md          # Development guidelines
├── package.json              # Dependencies
└── README.md                 # Project overview
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint JavaScript files |
| `npm run format` | Format code with Prettier |

## Next Steps

### 1. Customize Content

Edit content in two places:
- **HTML**: `src/index.html` - for structure and text
- **Config**: `src/scripts/config/content.js` - for programmatic content

See `docs/CONTENT-UPDATE-GUIDE.md` for detailed instructions.

### 2. Add Images

1. Place images in `src/assets/images/`
2. Optimize images (use WebP format)
3. Update image references in `src/index.html`

**Recommended tools for image optimization:**
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

### 3. Customize Colors

Edit `src/styles/base/variables.css`:

```css
:root {
  --color-primary: #1e40af;    /* Your brand color */
  --color-accent: #f59e0b;     /* Accent color */
}
```

### 4. Update Contact Information

Update in these files:
- `src/scripts/config/content.js` - contact object
- `src/index.html` - email links and contact section

### 5. Configure Contact Form

The contact form currently uses a simulated submission. To connect to a real backend:

1. **Option A: Use a form service** (Formspree, Netlify Forms, etc.)
2. **Option B: Create your own API endpoint**

Edit `src/scripts/components/contact-form.js` to update the submission logic.

## Customization Guide

### Changing Fonts

1. Go to [Google Fonts](https://fonts.google.com/)
2. Select your fonts
3. Update the link in `src/index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
   ```
4. Update CSS variables in `src/styles/base/variables.css`

### Changing Layout

All layout styles are in `src/styles/layout/`:
- `header.css` - Navigation and header
- `footer.css` - Footer styles
- `grid.css` - Grid system and containers

### Adding New Sections

1. Add HTML structure in `src/index.html`
2. Create styles in `src/styles/components/sections.css`
3. Add navigation link in header
4. Update smooth scroll in `src/scripts/components/navigation.js`

## Development Tips

### Hot Reload

The dev server automatically reloads when you save files:
- HTML changes → full page reload
- CSS changes → instant update (no reload)
- JS changes → full page reload

### Browser DevTools

Press `F12` to open DevTools:
- **Console** - View JavaScript logs and errors
- **Elements** - Inspect and modify HTML/CSS
- **Network** - Monitor resource loading
- **Lighthouse** - Run performance audits

### Code Formatting

Format your code automatically:
```bash
npm run format
```

Or set up auto-format on save in VS Code:
1. Install Prettier extension
2. Enable "Format on Save" in settings

## Troubleshooting

### Port Already in Use

If port 3000 is busy, Vite will use the next available port (3001, 3002, etc.)

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading

- Check file path is correct
- Ensure image is in `src/assets/images/`
- Verify file extension matches (case-sensitive)

### Styles Not Applying

- Check CSS syntax
- Verify import in `src/styles/main.css`
- Clear browser cache (Ctrl+Shift+R)

## Building for Production

When ready to deploy:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

The production files will be in the `dist/` folder.

See `docs/DEPLOYMENT.md` for detailed deployment instructions.

## Learning Resources

### HTML/CSS
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Vite
- [Vite Documentation](https://vitejs.dev/)

### Design Inspiration
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)

## Getting Help

1. **Check Documentation**
   - `PROJECT_RULES.md` - Development guidelines
   - `docs/CONTENT-UPDATE-GUIDE.md` - Content updates
   - `docs/DEPLOYMENT.md` - Deployment guide

2. **Common Issues**
   - Check browser console for errors
   - Verify file paths are correct
   - Ensure all dependencies are installed

3. **Code Quality**
   - Run `npm run lint` to check for errors
   - Use browser DevTools for debugging
   - Test in multiple browsers

## Project Guidelines

Before making changes, review:
- **PROJECT_RULES.md** - Complete development guidelines
- **Code Style** - Follow existing patterns
- **Testing** - Test changes in multiple browsers
- **Performance** - Keep Lighthouse score above 90

## Next Actions

1. ✅ Install dependencies (`npm install`)
2. ✅ Start dev server (`npm run dev`)
3. 📝 Customize content
4. 🎨 Add your images
5. 🎨 Adjust colors and fonts
6. 📧 Configure contact form
7. 🧪 Test thoroughly
8. 🚀 Deploy to production

---

**Need Help?** Review the documentation in the `docs/` folder or check `PROJECT_RULES.md` for detailed guidelines.

**Last Updated:** December 29, 2025

