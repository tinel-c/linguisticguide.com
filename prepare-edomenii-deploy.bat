@echo off
REM ================================================================
REM LinguisticGuide.com - eDomenii.ro Deployment Preparation Script
REM Windows Batch Script
REM ================================================================

echo.
echo ================================================================
echo LinguisticGuide.com - eDomenii.ro Deployment Preparation
echo ================================================================
echo.

REM Check if dist folder exists
if not exist "dist\" (
    echo [ERROR] dist\ folder not found!
    echo.
    echo Please run: npm run build
    echo.
    pause
    exit /b 1
)

echo [Step 1/5] Copying .htaccess to dist folder...
copy /Y "public\.htaccess" "dist\.htaccess"
if errorlevel 1 (
    echo [ERROR] Failed to copy .htaccess
    pause
    exit /b 1
)
echo [OK] .htaccess copied

echo.
echo [Step 2/5] Copying contact-handler.php to dist folder...
copy /Y "public\contact-handler.php" "dist\contact-handler.php"
if errorlevel 1 (
    echo [ERROR] Failed to copy contact-handler.php
    pause
    exit /b 1
)
echo [OK] contact-handler.php copied

echo.
echo [Step 3/5] Verifying required files...
if not exist "dist\index.html" (
    echo [ERROR] index.html not found in dist\
    pause
    exit /b 1
)
echo [OK] index.html found

if not exist "dist\robots.txt" (
    echo [WARNING] robots.txt not found in dist\
)

if not exist "dist\sitemap.xml" (
    echo [WARNING] sitemap.xml not found in dist\
)

echo.
echo [Step 4/5] Checking dist folder contents...
dir /B "dist\"
echo.

echo [Step 5/5] Creating deployment package...
if exist "edomenii-deploy.zip" del "edomenii-deploy.zip"
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'edomenii-deploy.zip' -Force"
if errorlevel 1 (
    echo [WARNING] Could not create ZIP file
    echo You can manually upload files from dist\ folder
) else (
    echo [OK] Created edomenii-deploy.zip
)

echo.
echo ================================================================
echo Deployment Preparation Complete!
echo ================================================================
echo.
echo Your files are ready in the dist\ folder:
echo   - dist\index.html
echo   - dist\.htaccess
echo   - dist\contact-handler.php
echo   - dist\assets\
echo   - dist\robots.txt
echo   - dist\sitemap.xml
echo.
echo ----------------------------------------------------------------
echo IMPORTANT: Before uploading to eDomenii.ro
echo ----------------------------------------------------------------
echo.
echo 1. Edit dist\contact-handler.php and update:
echo    - RECIPIENT_EMAIL (line 17)
echo    - FROM_EMAIL (line 18)
echo.
echo 2. Upload all files from dist\ folder to public_html on eDomenii.ro
echo.
echo 3. Set file permissions:
echo    - Directories: 755
echo    - Files: 644
echo.
echo 4. Enable SSL in cPanel (SSL/TLS Status - Run AutoSSL)
echo.
echo ----------------------------------------------------------------
echo Next Steps:
echo ----------------------------------------------------------------
echo.
echo 1. Open FileZilla or cPanel File Manager
echo 2. Connect to eDomenii.ro FTP
echo 3. Navigate to public_html folder
echo 4. Upload all contents from dist\ folder
echo 5. Test your site at https://linguisticguide.com
echo.
echo For detailed instructions, see: EDOMENII-DEPLOYMENT.md
echo.
echo ================================================================
pause

