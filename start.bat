@echo off
echo DashCreator - Установка зависимостей...

if not exist "node_modules" (
    echo Установка зависимостей...
    call npm install
    if errorlevel 1 (
        echo Ошибка установки зависимостей!
        pause
        exit /b 1
    )
) else (
    echo Зависимости уже установлены
)

echo.
echo Запуск dev сервера...
echo Откройте http://localhost:5173 в браузере
echo.

call npm run dev

