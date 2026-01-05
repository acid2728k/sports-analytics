@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════
echo   SPORTS ANALYTICS - БЫСТРАЯ ЗАГРУЗКА НА GITHUB
echo ═══════════════════════════════════════════════════════════
echo.
echo Введите ваш GitHub username:
set /p USERNAME="Username: "

if "%USERNAME%"=="" (
    echo.
    echo ❌ Username не может быть пустым!
    pause
    exit /b 1
)

echo.
echo ✅ Подключение к GitHub...
echo.

cd /d "%~dp0"

REM Remove existing remote if any
git remote remove origin 2>nul

REM Add remote
git remote add origin https://github.com/%USERNAME%/sports-analytics.git

echo.
echo ✅ Удаленный репозиторий добавлен!
echo.
echo 📤 Отправка кода на GitHub...
echo    (Может потребоваться ввод логина/пароля)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo 🎉 УСПЕХ! Код загружен на GitHub!
    echo.
    echo 📍 Репозиторий: https://github.com/%USERNAME%/sports-analytics
    echo.
) else (
    echo.
    echo ⚠️  Ошибка при отправке.
    echo.
    echo Возможные причины:
    echo 1. Репозиторий не создан на GitHub
    echo 2. Неправильный username
    echo 3. Нужен Personal Access Token вместо пароля
    echo.
    echo Создайте токен здесь: https://github.com/settings/tokens/new
    echo.
)

pause

