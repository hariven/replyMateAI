// db.ts
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT || 5432),
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
})

pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => console.error('❌ Error connecting to PostgreSQL:', err))


// export default pool
