# DashCreator

Low-code платформа для создания бизнес-дашбордов. Создавайте профессиональные дашборды за 10-15 минут без программирования.

## 🚀 Возможности

- **Drag & Drop конструктор** - интуитивное создание дашбордов
- **Множество виджетов** - графики, таблицы, метрики, индикаторы
- **Различные источники данных** - REST API, GraphQL, CSV, Google Sheets
- **Гибкая настройка** - фильтры, агрегации, трансформации данных
- **Экспорт и шеринг** - PNG, PDF, JSON, публичные ссылки
- **Темная тема** - поддержка light/dark режимов

## 📋 Требования

- Node.js 18+ 
- npm или yarn

## 🛠️ Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd DashCreator
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите dev сервер:
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## 📦 Сборка для продакшна

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

Для предпросмотра продакшн сборки:
```bash
npm run preview
```

## 🌐 Деплой

### Vercel

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

### Netlify

1. Установите Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Деплой:
```bash
netlify deploy --prod
```

### Docker

Создайте `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

И `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Сборка и запуск:
```bash
docker build -t dashcreator .
docker run -p 80:80 dashcreator
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env`:

```env
# API базовый URL (если есть бэкенд)
VITE_API_BASE_URL=http://localhost:3000/api

# Использовать моки (true/false)
VITE_USE_MOCK=true
```

### Без бэкенда

По умолчанию приложение работает с моками данных. Все данные хранятся в памяти браузера.

Для подключения к реальному API:
1. Установите `VITE_API_BASE_URL` в `.env`
2. Установите `VITE_USE_MOCK=false`

## 📚 Структура проекта

```
src/
├── core/              # Ядро приложения
│   ├── stores/        # Zustand сторы
│   ├── providers/     # React Context провайдеры
│   └── constants/     # Константы
├── modules/           # Бизнес-модули
│   ├── dashboard/    # Конструктор дашбордов
│   ├── widgets/      # Виджеты
│   └── data-sources/ # Источники данных
├── lib/              # Утилиты
│   └── api/          # API клиент
├── components/       # UI компоненты
└── services/         # Сервисы
```

## 🎨 Виджеты

### Доступные виджеты

1. **Time Series Chart** - графики временных рядов
2. **Metric Card** - карточка с метрикой и дельтой
3. **Data Table** - таблица с сортировкой и фильтрацией
4. **Gauge** - круговой индикатор прогресса

### Добавление нового виджета

1. Создайте класс виджета, наследующий `BaseWidget`
2. Реализуйте методы: `getData`, `render`, `validateConfig`, `getEditPanel`
3. Зарегистрируйте в `src/modules/widgets/index.ts`

## 🔌 API

### Endpoints

- `GET /api/dashboards` - список дашбордов
- `POST /api/dashboards` - создать дашборд
- `GET /api/dashboards/:id` - получить дашборд
- `PUT /api/dashboards/:id` - обновить дашборд
- `DELETE /api/dashboards/:id` - удалить дашборд

- `GET /api/data-sources` - список источников
- `POST /api/data-sources` - создать источник
- `POST /api/data-sources/test` - тест подключения

- `POST /api/data/query` - запрос данных

## 🧪 Разработка

### Скрипты

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка для продакшна
- `npm run preview` - предпросмотр продакшн сборки
- `npm run lint` - проверка кода
- `npm run lint:fix` - автоисправление ошибок
- `npm run format` - форматирование кода
- `npm run type-check` - проверка типов

### Code Style

Проект использует:
- ESLint для линтинга
- Prettier для форматирования
- TypeScript strict mode

## 📝 Лицензия

MIT

## 🤝 Вклад

Приветствуются Pull Request'ы! Для больших изменений сначала откройте Issue.

## 📧 Контакты

Для вопросов и предложений создавайте Issue в репозитории.

---

Сделано с ❤️ для быстрого создания дашбордов
