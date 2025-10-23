// services/embedding.ts
import OpenAI from 'openai';
import { pool } from '../db';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Main function ---
export const saveKnowledgeWithEmbedding = async (businessId: string, content: string | { content: string }[]) => {
    const normalizedContent = Array.isArray(content)
        ? content.map(item => item.content).join(' ')
        : content;
    const chunks = chunkText(normalizedContent, 500); // ~500 chars, sentence-aware
    console.log(`Saving ${chunks.length} chunks for business ${businessId}`);

    for (const chunk of chunks) {
        const embedding = await getEmbedding(chunk);
        const vectorString = `[${embedding.join(',')}]`;

        await pool.query(
            `INSERT INTO knowledge_base_embeddings (business_id, content, embedding)
             VALUES ($1, $2, $3)`,
            [businessId, chunk, vectorString] // <== pass as array, PG vector type handles it
        );
    }

    console.log('Knowledge base embedding saved successfully.');
};

// --- Save image knowledge (label + description + url + embedding) ---
export const saveImageWithEmbedding = async (
    businessId: string,
    // label: string,
    description: string,
    url: string
) => {
    const embeddingText = `${description}`;
    const embedding = await getEmbedding(embeddingText);
    const vectorString = `[${embedding.join(",")}]`;

    await pool.query(
        `INSERT INTO business_images (business_id, description, image_url, embedding)
       VALUES ($1, $2, $3, $4)`,
        [businessId, description, url, vectorString]
    );

    console.log("✅ Image knowledge embedding saved.");
};

// --- Generate OpenAI embedding ---
async function getEmbedding(text: string): Promise<number[]> {
    const response = await client.embeddings.create({
        input: text,
        model: 'text-embedding-3-small'
    });
    return response.data[0].embedding;
}

// --- Improved text chunking (split by sentence, then group) ---
function chunkText(text: string, size = 500): string[] {
    const sentences = text.split(/(?<=[.?!])\s+/); // split by sentence end
    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
        if ((current + ' ' + sentence).length > size) {
            chunks.push(current.trim());
            current = '';
        }
        current += sentence + ' ';
    }
    if (current.trim()) chunks.push(current.trim());

    return chunks;
}
