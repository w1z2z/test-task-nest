# Тестовое задание

## Установка

Для установки необходимых зависимостей, выполните следующую команду:

```bash
npm install
```

## Переменные среды

Для корректной работы проекта создайте файл .env в корневой директории и добавьте в него следующие переменные:

```dotenv
PORT=PORT

DB_PORT=5432
DB_HOST=localhost
DB_NAME=DB_NAME
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD

```

## Postgres

Запустите docker-compose.yaml для поднятия Postgres локально в докере (/src/database/docker-compose.yaml)

```bash
docker-compose up
```

## Запуск

Для запуска проекта используйте следующие команды:

```bash
# Режим разработки
npm run start:dev

# Запуск в обычном режиме
npm run start
```

## Проверка API

Все запросы будут доступны по адресу [http://localhost:8000/api/...](http://localhost:8000/api)

Описание всех запросов можно посмотреть в Swagger - [http://localhost:8000/doc](http://localhost:8000/doc)





