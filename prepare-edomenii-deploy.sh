#!/bin/bash
# ================================================================
# LinguisticGuide.com - eDomenii.ro Deployment Preparation Script
# Linux/Mac Bash Script
# ================================================================

echo ""
echo "================================================================"
echo "LinguisticGuide.com - eDomenii.ro Deployment Preparation"
echo "================================================================"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "[ERROR] dist/ folder not found!"
    echo ""
    echo "Please run: npm run build"
    echo ""
    exit 1
fi

echo "[Step 1/5] Copying .htaccess to dist folder..."
cp -f "public/.htaccess" "dist/.htaccess"
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to copy .htaccess"
    exit 1
fi
echo "[OK] .htaccess copied"

echo ""
echo "[Step 2/5] Copying contact-handler.php to dist folder..."
cp -f "public/contact-handler.php" "dist/contact-handler.php"
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to copy contact-handler.php"
    exit 1
fi
echo "[OK] contact-handler.php copied"

echo ""
echo "[Step 3/5] Verifying required files..."
if [ ! -f "dist/index.html" ]; then
    echo "[ERROR] index.html not found in dist/"
    exit 1
fi
echo "[OK] index.html found"

if [ ! -f "dist/robots.txt" ]; then
    echo "[WARNING] robots.txt not found in dist/"
fi

if [ ! -f "dist/sitemap.xml" ]; then
    echo "[WARNING] sitemap.xml not found in dist/"
fi

echo ""
echo "[Step 4/5] Checking dist folder contents..."
ls -la "dist/"
echo ""

echo "[Step 5/5] Creating deployment package..."
if [ -f "edomenii-deploy.zip" ]; then
    rm "edomenii-deploy.zip"
fi
cd dist && zip -r ../edomenii-deploy.zip . && cd ..
if [ $? -ne 0 ]; then
    echo "[WARNING] Could not create ZIP file"
    echo "You can manually upload files from dist/ folder"
else
    echo "[OK] Created edomenii-deploy.zip"
fi

echo ""
echo "================================================================"
echo "Deployment Preparation Complete!"
echo "================================================================"
echo ""
echo "Your files are ready in the dist/ folder:"
echo "  - dist/index.html"
echo "  - dist/.htaccess"
echo "  - dist/contact-handler.php"
echo "  - dist/assets/"
echo "  - dist/robots.txt"
echo "  - dist/sitemap.xml"
echo ""
echo "----------------------------------------------------------------"
echo "IMPORTANT: Before uploading to eDomenii.ro"
echo "----------------------------------------------------------------"
echo ""
echo "1. Edit dist/contact-handler.php and update:"
echo "   - RECIPIENT_EMAIL (line 17)"
echo "   - FROM_EMAIL (line 18)"
echo ""
echo "2. Upload all files from dist/ folder to public_html on eDomenii.ro"
echo ""
echo "3. Set file permissions:"
echo "   - Directories: 755"
echo "   - Files: 644"
echo ""
echo "4. Enable SSL in cPanel (SSL/TLS Status - Run AutoSSL)"
echo ""
echo "----------------------------------------------------------------"
echo "Next Steps:"
echo "----------------------------------------------------------------"
echo ""
echo "1. Open FileZilla or cPanel File Manager"
echo "2. Connect to eDomenii.ro FTP"
echo "3. Navigate to public_html folder"
echo "4. Upload all contents from dist/ folder"
echo "5. Test your site at https://linguisticguide.com"
echo ""
echo "For detailed instructions, see: EDOMENII-DEPLOYMENT.md"
echo ""
echo "================================================================"

