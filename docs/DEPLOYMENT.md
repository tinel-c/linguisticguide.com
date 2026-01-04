# Deployment Guide

## Pre-Deployment Checklist

Before deploying to production, ensure you've completed:

- [ ] All content is finalized and proofread
- [ ] Images are optimized (WebP format, compressed)
- [ ] Meta tags and SEO elements are configured
- [ ] Contact form is connected to email service
- [ ] All links are tested and working
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed (WAVE, axe)
- [ ] Performance audit passed (Lighthouse 90+)
- [ ] Analytics tracking configured (if needed)

## Build for Production

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build locally
npm run preview
```

The production files will be generated in the `dist/` folder.

> [!NOTE]
> The `dist/` folder is excluded from version control and is only created when you run `npm run build`. If you don't see this folder, it means the project hasn't been built yet or the build failed.

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Connect Repository:**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your Git repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables:**
   - None required for static site

4. **Custom Domain:**
   - Go to Domain settings
   - Add custom domain: linguisticguide.com
   - Follow DNS configuration instructions

### Option 2: Vercel

1. **Deploy:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure:**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Custom Domain:**
   - Add domain in Vercel dashboard
   - Configure DNS records

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Add to package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Configure:**
   - Go to repository Settings > Pages
   - Source: gh-pages branch

### Option 4: Cloudflare Pages

1. **Connect Repository:**
   - Sign in to Cloudflare
   - Go to Pages
   - Connect Git repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Build output directory: dist
   ```

### Option 5: Traditional Hosting (cPanel, FTP)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload:**
   - Upload contents of `dist/` folder to your web server
   - Ensure files are in the public_html or www directory

## DNS Configuration

Point your domain to the hosting provider:

### For Netlify/Vercel/Cloudflare:
```
A Record: @ → [Provider IP]
CNAME: www → [Provider domain]
```

### SSL Certificate

All recommended providers offer free SSL certificates:
- Netlify: Automatic
- Vercel: Automatic
- Cloudflare: Automatic
- GitHub Pages: Automatic for custom domains

## Post-Deployment

1. **Test the live site:**
   - All pages load correctly
   - Forms work properly
   - Images display
   - Links function
   - Mobile responsive

2. **Performance Check:**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test page load speed

3. **SEO Setup:**
   - Submit sitemap to Google Search Console
   - Verify site ownership
   - Set up analytics (optional)

4. **Monitor:**
   - Set up uptime monitoring
   - Check error logs
   - Monitor performance metrics

## Continuous Deployment

For automatic deployments on Git push:

1. **Netlify/Vercel:**
   - Automatic when connected to Git

2. **GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Check for syntax errors
- **Terser Error**: Ensure `terser` is installed (`npm install -D terser`) if minification is enabled.

### "dist/" folder not found
- Ensure you have run `npm run build` successfully.
- Check the terminal output for any errors during the build process.
- Note that `dist/` is ignored by Git, so it won't appear in the repository until built locally.

### Images Not Loading
- Verify image paths are correct
- Check file extensions match
- Ensure images are in public/ or assets/

### Form Not Working
- Verify form handler is configured
- Check CORS settings
- Test with browser console open

## Support

For deployment issues:
1. Check hosting provider documentation
2. Review build logs
3. Test locally with `npm run preview`
4. Verify all environment variables

---

**Last Updated:** December 29, 2025

