# 🚀 Quick Start - LinguisticGuide.com

## Get Running in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open Browser
Navigate to: `http://localhost:3000`

---

## 📝 What to Do Next

### Immediate Actions
1. **Replace placeholder images** in `src/assets/images/`
2. **Update contact email** in `src/scripts/config/content.js`
3. **Customize colors** in `src/styles/base/variables.css`
4. **Edit content** in `src/index.html`

### Before Going Live
- [ ] Add real images (optimized WebP format)
- [ ] Update all text content
- [ ] Configure contact form backend
- [ ] Update meta tags for SEO
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target 90+)
- [ ] Test in multiple browsers

---

## 🛠️ Essential Commands

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Start development (with hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **PROJECT_RULES.md** - Complete development guidelines
- **docs/CONTENT-UPDATE-GUIDE.md** - How to update content
- **docs/DEPLOYMENT.md** - How to deploy

---

## 🎨 Quick Customization

### Change Colors
Edit `src/styles/base/variables.css`:
```css
--color-primary: #1e40af;  /* Your brand color */
--color-accent: #f59e0b;   /* Accent color */
```

### Change Fonts
1. Get fonts from [Google Fonts](https://fonts.google.com/)
2. Update link in `src/index.html`
3. Update variables in `src/styles/base/variables.css`

### Update Contact Info
Edit `src/scripts/config/content.js`:
```javascript
contact: {
  email: 'your-email@example.com',
  // ... more settings
}
```

---

## ✅ Quality Checklist

Before deploying:
- [ ] All images optimized
- [ ] Contact form working
- [ ] Mobile responsive
- [ ] All links functional
- [ ] Fast loading (< 3 seconds)
- [ ] Accessible (WCAG AA)
- [ ] SEO optimized

---

## 🚀 Deploy

When ready:
```bash
npm run build
```

Upload the `dist/` folder to your hosting provider.

See **docs/DEPLOYMENT.md** for detailed instructions.

---

**Need Help?** Check **SETUP.md** for detailed guidance.

**Last Updated:** December 29, 2025

