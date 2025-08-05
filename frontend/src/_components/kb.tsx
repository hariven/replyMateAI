import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const KnowledgeEditor: FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!businessName || !whatsappNumber || !content) {
      setStatus("❌ Please fill all fields");
      return;
    }
    setStatus("Saving...");
    try {
      const res = await fetch("/api/save-knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: businessName,
          whatsapp_number: whatsappNumber,
          content,
        }),
      });
      if (res.ok) {
        const savedBusiness = await res.json();
        setStatus("✅ Saved successfully");
        setContent("");
        // Redirect to dashboard with new business info
        navigate("/", { state: { newBusiness: savedBusiness } });
      } else {
        const err = await res.text();
        setStatus(`❌ Error: ${err}`);
      }
    } catch (err) {
      setStatus(`❌ ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Knowledge Base Editor
        </h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              placeholder="e.g., Bright Minds Tuition Centre"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="e.g., +60 12-345 6789"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Knowledge Content
            </label>
            <textarea
              placeholder="e.g., Opening hours, pricing, FAQs..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {status && <p className="text-sm text-gray-600">{status}</p>}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeEditor;
