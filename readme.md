# jobsity chat app

## Requirements:

- Node
- Install dependencies

```
npm i
```

- RabbitMQ should be installed, more info at [https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html)
  the default url is used at amqp://localhost
- Rename config.env.env to config.env and add mongodbURI

## Run the program

```
npm run dev
```

Program will be running on localhost:5000

### Used

- Jest and supertest for tests
- Mongodb to store users and messages
- Express
- Socket io for chat
- Passport for auth
- RabbitMQ for chat_bot

## Tests

Run tests:

```
npm test
```
