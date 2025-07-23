import { useState, type FC } from 'react'
import { Button } from '@mui/material'

const KnowledgeEditor: FC = () => {
  const [businessName, setBusinessName] = useState('')
  const [businessNumber, setBusinessNumber] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    setStatus('Saving...')
    try {
      const res = await fetch('/api/save-knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:businessName, whatsapp_number: businessNumber, content })
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
      <div>
      <label>
          Business Name:
          {/* <input
            type="text"
            placeholder="60123456789"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          /> */}
          <input
        placeholder="Business Name"
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
        style={{  padding: "0.5rem", marginBottom: "1rem" }}

      />
        </label>
        </div>
      <div>
      <label>
          WhatsApp Number:
          {/* <input
            type="text"
            placeholder="60123456789"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          /> */}
          <input
        placeholder="Business WhatsApp Number"
        value={businessNumber}
        onChange={e => setBusinessNumber(e.target.value)}
        style={{  padding: "0.5rem", marginBottom: "1rem" }}

      />
        </label>
        </div>
      {/* <input
        placeholder="Business WhatsApp Number"
        value={businessNumber}
        onChange={e => setBusinessNumber(e.target.value)}
      /> */}
      <label>
          Knowledge Content:
          <textarea
            rows={6}
            placeholder="e.g., Opening hours, pricing, FAQ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </label>
      {/* <TextareaAutosize
        minRows={10}
        placeholder="Paste or write the business knowledge base here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      /> */}
      <Button onClick={handleSubmit} disabled={!businessNumber || !content} style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            cursor: "pointer",
          }}>
        Save Knowledge Base
      </Button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  )
}

export default  KnowledgeEditor



