# Service serves send push notifications to the users who subscribed to specific channels.

- [Install](#install)
  - [Setup Environment](#setup-environment)
    - [Installation](#installation)
    - [Environment Configuration](#environment-configuration)
    - [Run database and seeding data](#run-database-and-seeding-data)
- [Commands](#commands)
- [API Endpoints](#api-endpoints)
  - [POST - /notifications](#post---notifications)
  - [GET - /notifications](#get---notifications)
  - [GET - /health](#get---health)
- [Documents](#documents)
  - [API Document](#api-document)

## Install

### Setup Environment

#### Installation

Before starting to explore this application. You have to make sure your machine has a Node version >= 15.

- `Node verion >= 15` (Required)
- `Docker client` (Required)
- Run the command `npm i` to install all the dependencies of this application.

#### Environment Configuration

Following `apps/notification/.env.example` file, you have to create a new copy file called `apps/notification/.env`. This is where the environments variables are situated. The following variables below must be declared in the `.env` file.

- `NODE_ENV=development or NODE_ENV=production` (The running environment of the application)
- `APP_PORT=4000` (The running port of the application)
- `APP_HOST=0.0.0.0` (The address where hosted application)
- `DATABASE_URL=mongodb://mongo:mongo@localhost:27017/notification?authSource=admin` (The string hold all database's credentials)

#### Run database and seeding data

```bash
$ docker-compose up -d mongo mongo-express
$ npm run db:restore

You can check web dashboard (mongo-express) on http://localhost:8081
```

## Commands

By using the following commands you will make the application work in the proper way.

```bash
# format the code styles
$ npm run format

# lint, checking the coding rules
$ npm run lint

# lint, fix violents coding rules
$ npm run lint:fix

# build notification application
$ npm run build:notification

# run end to end testing
$ npm run test:e2e

# run both unit test and e2e testing
$ npm run test

# start the application using Docker development
$ docker-compose up

# force the application running with Docker in the background
$ docker-compose up -d

# development
$ npm run start:notification:dev

# production mode
$ npm run start:notification:prod
```

## API Endpoints

### POST - /notifications

Endpoint allows sending push notifications to a given user, who subscribed to the specific channels.

> Auth Type: NONE

#### Body Request<!-- omit in toc -->

| Property  | Type   | Specificity                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| userId    | string | **required**                                                              |
| companyId | string | **required**                                                              |
| type      | string | **enum: ['leave-balance-reminder', 'monthly-payslip', 'happy-birthday']** |

#### Response<!-- omit in toc -->

201

```jsonc
{
  "success": true
}
```

400

```jsonc
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["userId should be a integer", "companyId should not be empty."]
}
```

500

```jsonc
{
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Database connection error"
}
```

### GET - /notifications

Endpoint allows fetching the list channel notifications for a given user.

> Auth Type: NONE

#### Query Parameters<!-- omit in toc -->

| Property      | Type    | Specificity               |
| ------------- | ------- | ------------------------- |
| userId        | string  | **required**              |
| channel       | string  | **enum: ['ui', 'email']** |
| page          | integer | Optional                  |
| limit         | integer | Optional                  |
| sortBy        | integer | Optional                  |
| sortDirection | integer | Optional                  |

#### Response<!-- omit in toc -->

200

```jsonc
{
  "total": 1,
  "notifications": [
    {
      "_id": "-P7UD8SL_thc9cn2KrrDD",
      "createdAt": "2022-03-16T19:31:50.794Z",
      "updatedAt": "2022-03-16T19:31:50.794Z",
      "content": "This is notification UI",
      "userId": "97827b3a-a529-11ec-b909-0242ac120002",
      "companyId": "97827c70-a529-11ec-b909-0242ac120002",
      "channel": "ui",
      "isRead": false
    }
  ]
}
```

400

```jsonc
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Notification not found"
}
```

500

```jsonc
{
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Database connection error"
}
```

### GET - /health

The default endpoint runs in the middleware when you start running the application. This serves to check the health status of this application.

> Auth Type: NONE

#### Response<!-- omit in toc -->

200 - OK

## Documents

### API Document

After starting the command `npm run start:notification:dev` or `npm run start:notification:prod`, you can land on API document page which is`http://${url}:${port}/ws-notification/documents/static/index.html` and all documents for the implemented endpoints are situated there.
