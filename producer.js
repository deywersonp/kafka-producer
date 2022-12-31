const { Kafka } = require('kafkajs');
const { randomUUID } = require('node:crypto');

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['united-martin-12281-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'dW5pdGVkLW1hcnRpbi0xMjI4MSR4DDwfkhbPe0RCE3wYU_60RyO7N2zmub9r1rQ',
      password: '36320c92decc47a4a73086b518d06a0b',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  })

  await producer.disconnect()
};

bootstrap();