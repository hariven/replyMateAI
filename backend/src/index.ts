import express from 'express'
import dotenv from 'dotenv'
import webhookRoutes from './webhook.ts' // ✅ Make sure `.ts` is included if you're using ESM

dotenv.config({ quiet: true });

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) // Required to parse webhook payload

// ✅ Wire the route
app.use('/api', webhookRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
