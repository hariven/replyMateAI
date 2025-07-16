import { useState, type FC } from 'react'
import { TextareaAutosize, Button } from '@mui/material'

const KnowledgeEditor: FC = () => {
  const [businessNumber, setBusinessNumber] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    setStatus('Saving...')
    try {
      const res = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp_number: businessNumber, content })
      })
      if (res.ok) {
        setStatus('✅ Saved successfully')
        setContent('')
      } else {
        const err = await res.text()
        setStatus(`❌ Error: ${err}`)
      }
    } catch (err) {
      setStatus(`❌ ${err}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Knowledge Base Editor</h2>
      <input
        placeholder="Business WhatsApp Number"
        value={businessNumber}
        onChange={e => setBusinessNumber(e.target.value)}
      />
      <TextareaAutosize
        minRows={10}
        placeholder="Paste or write the business knowledge base here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={!businessNumber || !content}>
        Save Knowledge Base
      </Button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  )
}

export default  KnowledgeEditor