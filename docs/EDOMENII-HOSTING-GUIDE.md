# eDomenii.ro Hosting Guide for LinguisticGuide.com

## Overview

**eDomenii.ro** is a Romanian hosting service provider operated by GlobeHosting, with over 20 years of experience and 40,000+ hosted websites. They are ICANN accredited and offer reliable hosting services suitable for the linguisticguide.com static website.

---

## Hosting Capabilities Summary

### ✅ Perfect for Your Static Website

Your linguisticguide.com website is a **static site** (HTML, CSS, JavaScript) with no backend requirements, which makes it ideal for eDomenii.ro's shared hosting services.

### Key Features
- **cPanel Control Panel** - Easy file management
- **LiteSpeed Web Server** - Fast performance (better than Apache)
- **Free SSL Certificates** - HTTPS included
- **Daily Backups** - Automatic protection
- **99.9% Uptime Guarantee** - Reliable service
- **FTP/File Manager Access** - Easy file uploads
- **Email Support & Live Chat** - Romanian language support

---

## Recommended Hosting Plan

### Shared Web Hosting (Best Choice)
**Price**: Starting at **€1.19/month** (~$1.40/month)

**Specifications**:
- **Disk Space**: 3 GB (Your site: ~200 KB, plenty of room)
- **Bandwidth**: 199.99 GB/month (More than sufficient)
- **cPanel**: Full access
- **LiteSpeed Server**: Fast loading
- **Free SSL**: Included
- **Daily Backups**: Automatic
- **Money-Back Guarantee**: 30 days

**Perfect for**:
- ✅ Static websites (HTML, CSS, JS)
- ✅ Single-page applications
- ✅ Small to medium traffic sites
- ✅ No database required sites

---

## Technical Compatibility

### ✅ Fully Supports Your Website

Your linguisticguide.com project uses:
- **HTML5** ✅ Supported
- **CSS3** ✅ Supported
- **JavaScript (ES6+)** ✅ Supported
- **Static files** ✅ Supported
- **WebP images** ✅ Supported
- **No backend** ✅ Perfect (none needed)

### Additional Capabilities (if needed in future)
- **PHP** (multiple versions available)
- **MySQL/MariaDB** databases
- **Node.js** (via cPanel if needed)
- **Email accounts**
- **Subdomain creation**

---

## Deployment Methods to eDomenii.ro

### Method 1: FTP Upload (Recommended)

1. **Build your website**:
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with production files.

2. **Connect via FTP**:
   - **FTP Client**: FileZilla (free) or WinSCP
   - **Host**: ftp.yourdomain.com (provided by eDomenii)
   - **Username**: Your cPanel username
   - **Password**: Your cPanel password
   - **Port**: 21 (or 22 for SFTP)

3. **Upload files**:
   - Navigate to `public_html` directory
   - Upload all contents from `dist/` folder
   - Ensure `index.html` is in root of `public_html`

### Method 2: cPanel File Manager

1. **Login to cPanel**:
   - Go to: https://yourdomain.com:2083
   - Or: https://edomenii.ro/clientarea.php

2. **Use File Manager**:
   - Open File Manager in cPanel
   - Navigate to `public_html` directory
   - Upload ZIP of your `dist/` folder
   - Extract the ZIP file
   - Move all files to root of `public_html`

### Method 3: cPanel Upload Tool

1. Build your site locally: `npm run build`
2. Create a ZIP of the `dist/` folder contents
3. Login to cPanel
4. Use the "Upload" feature
5. Extract to `public_html`

---

## Step-by-Step Deployment Guide

### Phase 1: Prepare Your Website

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Test the build**:
   ```bash
   npm run preview
   ```
   Verify everything works at http://localhost:4173

3. **Prepare files**:
   - Your production files are in the `dist/` folder
   - This includes: HTML, CSS, JS, images, and other assets

### Phase 2: Get Hosting Information

From eDomenii.ro account, you'll need:
- ✅ FTP hostname (usually ftp.linguisticguide.com)
- ✅ FTP username
- ✅ FTP password
- ✅ cPanel URL
- ✅ cPanel credentials

### Phase 3: Upload Files

**Using FileZilla (Recommended)**:

1. **Download FileZilla**: https://filezilla-project.org/
2. **Connect**:
   - Host: Your FTP hostname
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. **Navigate**: Find `public_html` folder on server
4. **Upload**: Drag all files from local `dist/` folder to `public_html`
5. **Wait**: Let all files upload (may take 5-10 minutes)

### Phase 4: Configure Domain & SSL

1. **Point Domain**:
   - If domain is at eDomenii: Automatic
   - If domain elsewhere: Update DNS:
     - A Record: @ → Server IP (provided by eDomenii)
     - CNAME: www → linguisticguide.com

2. **Enable SSL**:
   - In cPanel, go to "SSL/TLS Status"
   - Click "Run AutoSSL"
   - Wait for certificate installation (5-15 minutes)

3. **Force HTTPS**:
   - Create `.htaccess` file in `public_html`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Phase 5: Test Your Site

1. **Visit your domain**: https://linguisticguide.com
2. **Check**:
   - ✅ All pages load
   - ✅ Images display correctly
   - ✅ Navigation works
   - ✅ Contact form works (may need configuration)
   - ✅ Mobile responsive
   - ✅ HTTPS padlock shows

---

## Contact Form Configuration

Your contact form currently simulates submission. For eDomenii.ro:

### Option 1: PHP Form Handler (Recommended)

Create `contact-handler.php` in your `public_html`:

```php
<?php
// contact-handler.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $service = htmlspecialchars($data['service']);
    $message = htmlspecialchars($data['message']);
    
    $to = 'contact@linguisticguide.com';
    $subject = 'New Contact Form Submission';
    $body = "Name: $name\nEmail: $email\nService: $service\nMessage: $message";
    $headers = "From: noreply@linguisticguide.com";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
```

Update `src/scripts/components/contact-form.js`:
```javascript
// Replace the submitFormData function:
async function submitFormData(data) {
  const response = await fetch('/contact-handler.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

### Option 2: Formspree (Easiest)

1. Sign up at https://formspree.io (free plan available)
2. Get your form endpoint
3. Update form action in HTML

### Option 3: Email via JavaScript

Use a service like EmailJS:
- https://www.emailjs.com/
- Free tier: 200 emails/month
- No PHP needed

---

## Performance Optimization

### On eDomenii.ro Server

1. **Enable Gzip Compression** (via .htaccess):
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css text/javascript
     AddOutputFilterByType DEFLATE application/javascript application/json
   </IfModule>
   ```

2. **Browser Caching** (via .htaccess):
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/gif "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

3. **LiteSpeed Cache**:
   - Already enabled by default on eDomenii.ro
   - Faster than Apache/Nginx

---

## Cost Breakdown

### Initial Setup (First Year)

| Item | Cost | Notes |
|------|------|-------|
| Shared Hosting | €1.19/month × 12 = €14.28 | Basic plan sufficient |
| Domain (.com) | ~€11.79/year | If registering new |
| SSL Certificate | FREE | Included with hosting |
| **Total Year 1** | **~€26.07** | **~$28 USD** |

### Ongoing (Per Year)

| Item | Annual Cost |
|------|-------------|
| Hosting Renewal | ~€14.28 |
| Domain Renewal | ~€11.79 |
| **Total/Year** | **~€26.07** |

**Very affordable** for professional hosting!

---

## Advantages of eDomenii.ro for Your Project

### ✅ Perfect Match

1. **Romanian Provider**: Local support if needed
2. **Affordable**: Starting at €1.19/month
3. **cPanel**: Easy to use, industry standard
4. **LiteSpeed**: Fast server performance
5. **Free SSL**: HTTPS included
6. **Static Site Friendly**: No limitations for HTML/CSS/JS
7. **Reliable**: 99.9% uptime, 20+ years experience
8. **Support**: Live chat and email in Romanian
9. **Easy Upload**: FTP, File Manager, or cPanel
10. **Scalable**: Can upgrade if traffic grows

### ✅ No Disadvantages for Your Use Case

Your static website doesn't require:
- ❌ Node.js server (you build locally)
- ❌ Database (purely frontend)
- ❌ Server-side processing (static files)
- ❌ Complex deployment pipeline

Traditional shared hosting is **perfect** for this!

---

## Comparison: eDomenii.ro vs Other Options

| Feature | eDomenii.ro | Netlify | Vercel | GitHub Pages |
|---------|-------------|---------|---------|--------------|
| **Price** | €1.19/mo | Free | Free | Free |
| **Custom Domain** | ✅ Included | ✅ Free | ✅ Free | ✅ Free |
| **SSL** | ✅ Free | ✅ Free | ✅ Free | ✅ Free |
| **Romanian Support** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **cPanel** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Email Hosting** | ✅ Available | ❌ No | ❌ No | ❌ No |
| **FTP Access** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Easy for Non-Devs** | ✅ Yes | Medium | Medium | Hard |
| **PHP Support** | ✅ Yes | ❌ No | Serverless | ❌ No |

**Best Choice**: 
- **eDomenii.ro** if you want traditional hosting, email, and Romanian support
- **Netlify/Vercel** if you want modern deployment and don't need email

---

## Common Questions

### Q: Can I host my static website on eDomenii.ro?
**A**: Yes! Absolutely perfect for static HTML/CSS/JS sites.

### Q: Do I need to know PHP?
**A**: No, unless you want to add a contact form handler later.

### Q: Will my website be fast?
**A**: Yes! LiteSpeed servers are very fast, and your optimized static site will load quickly.

### Q: Can I use my existing domain?
**A**: Yes! Point your domain's DNS to eDomenii.ro servers (they provide instructions).

### Q: Is SSL included?
**A**: Yes! Free Let's Encrypt SSL certificates included.

### Q: Can I get email addresses?
**A**: Yes! Like contact@linguisticguide.com (additional feature of shared hosting).

### Q: How do I upload files?
**A**: Via FTP (FileZilla), cPanel File Manager, or cPanel Upload tool.

### Q: Can I update the site easily?
**A**: Yes! Just rebuild locally and re-upload via FTP.

---

## Support & Documentation

### eDomenii.ro Support
- **Website**: https://www.edomenii.ro
- **Live Chat**: Available on website
- **Email Support**: Available
- **Client Area**: https://edomenii.ro/clientarea.php
- **Blog**: https://blog.globehosting.ro
- **Language**: Romanian (primary)

### Getting Help
1. Check their knowledge base
2. Use live chat for quick questions
3. Email for detailed issues
4. Phone support available

---

## Quick Deployment Checklist

- [ ] Purchase hosting plan at eDomenii.ro
- [ ] Receive FTP credentials and cPanel access
- [ ] Build your site: `npm run build`
- [ ] Install FileZilla or use cPanel
- [ ] Upload `dist/` contents to `public_html`
- [ ] Point domain to eDomenii.ro servers
- [ ] Enable SSL certificate
- [ ] Test website thoroughly
- [ ] Configure contact form (if needed)
- [ ] Set up email addresses (optional)

---

## Conclusion

**eDomenii.ro is an excellent choice** for hosting linguisticguide.com because:

1. ✅ Affordable (€1.19/month)
2. ✅ Reliable (20+ years, 99.9% uptime)
3. ✅ Romanian provider (local support)
4. ✅ Perfect for static websites
5. ✅ Easy to use (cPanel)
6. ✅ Free SSL included
7. ✅ Fast servers (LiteSpeed)
8. ✅ Can add email hosting
9. ✅ Traditional hosting (familiar)
10. ✅ Scalable if needed

Your static website will work perfectly on their shared hosting plan, and you'll have room to grow with email accounts and potential future features.

---

**Next Steps**:
1. Sign up at https://www.edomenii.ro
2. Choose shared hosting plan (starting at €1.19/month)
3. Follow deployment guide above
4. Launch your site!

**Need help?** Refer to `docs/DEPLOYMENT.md` for general deployment guidance.

---

**Last Updated**: December 29, 2025

