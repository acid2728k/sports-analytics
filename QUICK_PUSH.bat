@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════
echo   SPORTS ANALYTICS - QUICK GITHUB UPLOAD
echo ═══════════════════════════════════════════════════════════
echo.
echo Enter your GitHub username:
set /p USERNAME="Username: "

if "%USERNAME%"=="" (
    echo.
    echo ❌ Username cannot be empty!
    pause
    exit /b 1
)

echo.
echo ✅ Connecting to GitHub...
echo.

cd /d "%~dp0"

REM Remove existing remote if any
git remote remove origin 2>nul

REM Add remote
git remote add origin https://github.com/%USERNAME%/sports-analytics.git

echo.
echo ✅ Remote repository added!
echo.
echo 📤 Pushing code to GitHub...
echo    (You may be asked for login/password)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo 🎉 SUCCESS! Code uploaded to GitHub!
    echo.
    echo 📍 Repository: https://github.com/%USERNAME%/sports-analytics
    echo.
) else (
    echo.
    echo ⚠️  Error during push.
    echo.
    echo Possible reasons:
    echo 1. Repository not created on GitHub
    echo 2. Incorrect username
    echo 3. Personal Access Token needed instead of password
    echo.
    echo Create token here: https://github.com/settings/tokens/new
    echo.
)

pause

