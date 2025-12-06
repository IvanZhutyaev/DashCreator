# Инструкция по деплою DashCreator

## Быстрый старт

### 1. Подготовка

Убедитесь, что у вас установлены зависимости:
```bash
npm install
```

### 2. Локальная сборка

Проверьте, что проект собирается:
```bash
npm run build
```

### 3. Выбор платформы для деплоя

## Vercel (Рекомендуется)

### Через веб-интерфейс:
1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте ваш репозиторий
3. Vercel автоматически определит настройки из `vercel.json`
4. Нажмите Deploy

### Через CLI:
```bash
npm i -g vercel
vercel
```

## Netlify

### Через веб-интерфейс:
1. Зайдите на [netlify.com](https://netlify.com)
2. Перетащите папку `dist` в Netlify Drop
3. Или подключите репозиторий

### Через CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## GitHub Pages

1. Установите `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Деплой:
```bash
npm run deploy
```

4. В настройках репозитория включите GitHub Pages

## Docker

1. Создайте Dockerfile (уже есть в проекте)
2. Соберите образ:
```bash
docker build -t dashcreator .
```

3. Запустите контейнер:
```bash
docker run -p 80:80 dashcreator
```

## Настройка переменных окружения

Создайте файл `.env.production`:
```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_USE_MOCK=false
```

## Проверка после деплоя

1. Откройте главную страницу
2. Создайте тестовый дашборд
3. Добавьте виджеты
4. Сохраните дашборд

## Troubleshooting

### Ошибка 404 при переходе по роутам
- Убедитесь, что настроены redirects в `vercel.json` или `netlify.toml`
- Для SPA нужен redirect всех путей на `index.html`

### API не работает
- Проверьте `VITE_API_BASE_URL` в переменных окружения
- Убедитесь, что CORS настроен на бэкенде
- Проверьте, что `VITE_USE_MOCK=false` для продакшна

### Белая страница
- Откройте консоль браузера и проверьте ошибки
- Убедитесь, что все зависимости установлены
- Проверьте, что сборка прошла без ошибок

