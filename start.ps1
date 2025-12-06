# Скрипт для запуска проекта DashCreator

Write-Host "DashCreator - Установка зависимостей..." -ForegroundColor Cyan

# Проверка наличия node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Установка зависимостей..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Ошибка установки зависимостей!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Зависимости уже установлены" -ForegroundColor Green
}

Write-Host "`nЗапуск dev сервера..." -ForegroundColor Cyan
Write-Host "Откройте http://localhost:5173 в браузере`n" -ForegroundColor Green

npm run dev

