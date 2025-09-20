import express from 'express'
import dotenv from 'dotenv'
import webhookRoutes from './routes/webhook.ts' // ✅ Make sure `.ts` is included if you're using ESM
import businessRoutes from './routes/business.ts'
import authRoutes from './routes/auth.ts'

dotenv.config({ quiet: true });

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) // Required to parse webhook payload

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

app.use("/api", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
