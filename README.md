## Локальный запуск
1. Создайте файл .env в корне приложения
2. В созданном файле укажите переменные окружения:
```
HOST=localhost
PORT=<порт, на котором будет запускаться сервис>
```
3. Для установки всех зависимостей выполните комманду
```
npm install
```
4. Для запуска приложения вы можете воспользоваться одним из скриптов:
  - development mode via node
  ```
  npm run start
  ```
  - development mode via nodemon
  ```
  npm run start:dev
  ```
  - production mode
  ```
  npm run start:prod
  ```

  5. Доступные Rest Endpoints

  Type | Route | Explanation
---- | ----- | -----
Post |  /person    |  Create person
Get  |  /person    |  Get all persons
Get  |  /person/id |  Get person by id
Put  |  /person/id |  Update person by id
Delete  |  /person/id |  Delete person by id

Для тестирования Internal Server Error ошибки можно воспользоваться /person/serverError

6. Данные следует передавать в json формате. Пример валидных данных:
```
{
    "name": "My Name",
    "age": 26,
    "hobbies": ["hobby1", "hobby2"]
}
```
