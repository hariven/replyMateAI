import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import webhookRoutes from './routes/webhook.ts' // ✅ Make sure `.ts` is included if you're using ESM
import businessRoutes from './routes/business.ts'
import authRoutes from './routes/auth.ts'
import replyRoutes from './routes/reply.ts'
import paymentRoutes from './routes/payment.ts'

dotenv.config({ quiet: true });

const app = express()
const PORT = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

app.use(express.json()) // Required to parse webhook payload

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: isProd ? ["https://replymateai.netlify.app"] : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get('/health', (_req, res) => {
    const healthStatus = {
        status: true,
        timestamp: new Date().toISOString(),
    }

    res.status(200).json(healthStatus)
})

// ✅ Wire the route
app.use('/api', webhookRoutes)
app.use('/api', businessRoutes)
app.use('/api', replyRoutes)
app.use("/api", authRoutes);
app.use("/api/payment", paymentRoutes);

// Error handler
app.use((err, _req, res, _next) => {
    console.error(err)
    res.status(500).json({
        message: 'Internal Server Error',
        ...(isProd ? {} : { stack: err.stack }), // hide stack in prod
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
})
