Перезапуск бэка:
- npx prisma generate --schema=apps/api/prisma/schema.prisma
- npm run build:api
- docker compose up -d --build lifestyle-api


Creating a new widget:
- create a WidgetType
- list into the Widget Registry
- create a library
- create a widget token into a library
- create an interface for widget input