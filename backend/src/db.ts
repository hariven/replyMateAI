// db.ts
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const isProd = process.env.NODE_ENV === 'production'

export const pool = new Pool(
    isProd
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }, // required for Supabase/Render hosted DB
        }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'mydb',
        }
)

// Without this, an idle client losing its connection (e.g. the DB closing it
// after a timeout) emits an unhandled 'error' event, which crashes the whole
// Node process. This is what was causing the repeated crash/restart loop on Render.
pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle PostgreSQL client:', err)
})

pool.connect()
    .then((client) => {
        console.log('✅ Connected to PostgreSQL')
        client.release()
    })
    .catch((err) => console.error('❌ Error connecting to PostgreSQL:', err))


// export default pool
