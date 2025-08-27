# Развертывание на GitHub Pages

## 1. Подготовка проекта

### Установка gh-pages
```bash
npm install --save-dev gh-pages
```

### Обновление package.json
Добавьте в `package.json`:
```json
{
  "homepage": "https://your-username.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Настройка Vite для GitHub Pages
Создайте или обновите `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
  build: {
    outDir: 'dist'
  }
})
```

## 2. Развертывание

### Шаг 1: Создание репозитория
1. Создайте новый репозиторий на GitHub
2. Назовите его `your-repo-name`
3. Сделайте его публичным

### Шаг 2: Загрузка кода
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### Шаг 3: Развертывание
```bash
npm run deploy
```

### Шаг 4: Настройка GitHub Pages
1. Перейдите в настройки репозитория
2. Найдите раздел "Pages"
3. В "Source" выберите "Deploy from a branch"
4. Выберите ветку `gh-pages` и папку `/ (root)`
5. Нажмите "Save"

## 3. Настройка Telegram Bot

### Шаг 1: Создание бота
1. Найдите @BotFather в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Сохраните токен

### Шаг 2: Настройка WebApp URL
1. Отправьте @BotFather `/mybots`
2. Выберите ваш бота
3. Нажмите "Bot Settings" → "Menu Button"
4. Установите URL: `https://your-username.github.io/your-repo-name`

### Шаг 3: Альтернативный способ
Можно создать кнопку в боте:
```javascript
// Пример кнопки
{
  text: "Открыть приложение",
  web_app: { 
    url: "https://your-username.github.io/your-repo-name" 
  }
}
```

## 4. Тестирование

### В Telegram
1. Найдите ваш бота
2. Нажмите кнопку меню
3. WebApp должен открыться

### В браузере
1. Откройте `https://your-username.github.io/your-repo-name`
2. Должен показаться индикатор "Демо-режим"
3. Данные пользователя будут моковыми

## 5. Обновления

### Для обновления приложения
```bash
# Внесите изменения в код
git add .
git commit -m "Update app"
git push

# Разверните обновления
npm run deploy
```

## 6. Полезные команды

### Просмотр статуса развертывания
```bash
# Проверить ветку gh-pages
git branch -a

# Посмотреть последние коммиты
git log --oneline gh-pages
```

### Локальное тестирование
```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 7. Troubleshooting

### Проблема: 404 ошибка
- Проверьте правильность URL в настройках бота
- Убедитесь, что репозиторий публичный
- Проверьте, что ветка gh-pages создана

### Проблема: Приложение не загружается
- Проверьте консоль браузера на ошибки
- Убедитесь, что base URL в vite.config.ts правильный
- Проверьте, что все зависимости установлены

### Проблема: Telegram WebApp не работает
- Убедитесь, что скрипт Telegram загружается
- Проверьте, что приложение открывается через бота
- В браузере будет работать демо-режим

## 8. Структура проекта после развертывания

```
your-repo-name/
├── src/                    # Исходный код
├── dist/                   # Собранное приложение (локально)
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md

GitHub Pages будет обслуживать файлы из ветки gh-pages
```

## 9. Безопасность

### Рекомендации
- Не храните токены бота в коде
- Используйте переменные окружения для продакшена
- Валидируйте данные от Telegram на сервере

### Для продакшена
Создайте `.env.production`:
```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_APP_URL=https://your-username.github.io/your-repo-name
```

## 10. Полезные ссылки

- [GitHub Pages Documentation](https://pages.github.com/)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
- [Telegram WebApp Documentation](https://core.telegram.org/bots/webapps)
- [Vite Configuration](https://vitejs.dev/config/)
