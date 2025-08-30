// // services/retrieval.ts
// import { pool } from '../db'
// import OpenAI from 'openai'

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// export async function getRelevantKnowledge(businessId: string, query: string, distanceMetric: 'cosine' | 'l2' = 'l2') {
//     const embedding = await getEmbedding(query)
//     const vectorString = `[${embedding.join(',')}]`;

//     // Choose the appropriate operator based on the distance metric
//     const distanceOperator = distanceMetric === 'cosine' ? '<=>' : '<->';


//     const { rows } = await pool.query(
//         `
//         SELECT content,
//            1 - (embedding <#> $2::vector) AS similarity
//     FROM knowledge_base_embeddings
//     WHERE business_id = $1
//     ORDER BY embedding <#> $2::vector ASC
//     LIMIT 5;
//         `,
//         [businessId, vectorString]
//     )
//     return rows
// }

// async function getEmbedding(text: string): Promise<number[]> {
//     const response = await client.embeddings.create({
//         input: text,
//         model: 'text-embedding-3-small'
//     })
//     return response.data[0].embedding
// }



// services/retrieval.ts
import { pool } from '../db'
import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function getRelevantKnowledge(
    userId: string,
    businessId: string,
    query: string,
    distanceMetric: 'cosine' | 'l2' = 'l2'
) {
    const embedding = await getEmbedding(query)
    const vectorString = `[${embedding.join(',')}]`

    const distanceOperator = distanceMetric === 'cosine' ? '<=>' : '<->'

    const { rows } = await pool.query(
        `
        SELECT content,
               1 - (embedding <#> $3::vector) AS similarity
        FROM knowledge_base_embeddings kbe
        INNER JOIN business b ON kbe.business_id = b.id
        WHERE kbe.business_id = $2
          AND b.user_id = $1
        ORDER BY embedding ${distanceOperator} $3::vector ASC
        LIMIT 5;
        `,
        [userId, businessId, vectorString]
    )

    return rows
}

async function getEmbedding(text: string): Promise<number[]> {
    const response = await client.embeddings.create({
        input: text,
        model: 'text-embedding-3-small'
    })
    return response.data[0].embedding
}
