Для запуска будущем:

# Backend (терминал 1)
cd sports-analytics-app/backend
npm run dev

# Frontend (терминал 2)
cd sports-analytics-app/frontend
npm run dev



Сейчас приложение работает на mock-данных (тестовых данных), которые сгенерированы в файле backend/src/services/mockData.ts.

Почему так?
Реальные спортивные API требуют:
- Платную подписку
- API-ключи
- Договор с провайдером данных


Спортивная статистика:
Провайдер	Спорты	Цена
API-Football	Футбол	от $0 (100 запросов/день)
SportRadar	Все виды	Enterprise
Odds API	Все + коэффициенты	от $0 (500/мес)
BetRadar	Все + live	Enterprise
RapidAPI Sports	Разные	от $0
Коэффициенты букмекеров:
Провайдер	Описание
The Odds API	40+ букмекеров
BetFair API	Биржа ставок
Pinnacle API	Прямой доступ


Как подключить реальный API:
Получить API-ключ у провайдера
Добавить ключ в .env файл бэкенда
Заменить mock-сервис на реальные запросы в backend/src/services/