import { Hono } from 'hono'
import { Kafka } from 'kafkajs'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9094'],
})

const producer = kafka.producer()

const paymentSchema = z.object({
  amount: z.number().positive(),
  orderId: z.string(),
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/payment', zValidator('json', paymentSchema), async (c) => {
  const { amount, orderId } = c.req.valid('json')
  const paymentId = crypto.randomUUID()

  await producer.connect()
  await producer.send({
    topic: 'payment-successful',
    messages: [
      {
        key: paymentId,
        value: JSON.stringify({
          paymentId,
          orderId,
          amount,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  })

  return c.json({
    success: true,
    message: 'Payment successful',
    paymentId,
  })
})

app.get('/payment/:id', (c) => {
  const { id } = c.req.param()
  return c.json({
    id,
    status: 'completed',
    amount: 100,
    timestamp: new Date().toISOString(),
  })
})

app.post('/payment/refund', async (c) => {
    const { orderId, paymentId } = await c.req.json()

    await producer.connect()
    await producer.send({
        topic: 'payment-refunded',
        messages: [
            {
                key: paymentId,
                value: JSON.stringify({
                    paymentId,
                    orderId,
                    timestamp: new Date().toISOString(),
                }),
            },
        ],
    })

    return c.json({
        success: true,
        message: 'Refund successful',
        paymentId,
    })
})


export default {
  port: 3002,
  fetch: app.fetch,
}