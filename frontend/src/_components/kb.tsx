// import { useState, type FC } from "react";
// import { useNavigate } from "react-router-dom";

// const KnowledgeEditor: FC = () => {
//   const [businessName, setBusinessName] = useState("");
//   const [content, setContent] = useState("");
//   const [status, setStatus] = useState("");
//   const [whatsappNumber, setWhatsappNumber] = useState("");
//   const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   if (!businessName || !whatsappNumber || !content) {
  //     setStatus("❌ Please fill all fields");
  //     return;
  //   }
  //   setStatus("Saving...");
  //   try {
  //     const res = await fetch("/api/save-knowledge", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: businessName,
  //         whatsapp_number: whatsappNumber,
  //         content,
  //       }),
  //     });
  //     if (res.ok) {
  //       const savedBusiness = await res.json();
  //       setStatus("✅ Saved successfully");
  //       setContent("");
  //       // Redirect to dashboard with new business info
  //       navigate("/", { state: { newBusiness: savedBusiness } });
  //     } else {
  //       const err = await res.text();
  //       setStatus(`❌ Error: ${err}`);
  //     }
  //   } catch (err) {
  //     setStatus(`❌ ${err}`);
  //   }
  // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//           Knowledge Base Editor
//         </h1>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Business Name
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Bright Minds Tuition Centre"
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               WhatsApp Number
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., +60 12-345 6789"
//               value={whatsappNumber}
//               onChange={(e) => setWhatsappNumber(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Knowledge Content
//             </label>
//             <textarea
//               placeholder="e.g., Opening hours, pricing, FAQs..."
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={6}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex justify-between items-center">
//           {status && <p className="text-sm text-gray-600">{status}</p>}
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             Save Knowledge Base
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KnowledgeEditor;


"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  ArrowBack,
  Chat as ChatIcon,
  Phone,
  Save,
  Preview,
  SmartToy,
  CheckCircle,
  Info,
  Lightbulb,
  Business,
  Delete,
  // Description,
} from "@mui/icons-material"
import ImageIcon from '@mui/icons-material/Image';
import { useLocation, useNavigate } from "react-router-dom"

interface KnowledgeEditorProps {
  // onNavigate: (page: "dashboard" | "kb-editor", data?: any) => void;
  initialBusinessData?: { // New prop for editing existing business
    id: string;
    name: string;
    whatsapp_number: string;
    content: string;
  };
}

interface ImageData {
  file: File
  preview: string
  description: string
}

const KnowledgeEditor: React.FC<KnowledgeEditorProps> = () => {
  const [businessName, setBusinessName] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
   // 🔹 Image state
   const [images, setImages] = useState<ImageData[]>([])
  //  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const location = useLocation();
  const initialBusinessData = (location.state as any)?.business;

  const navigate = useNavigate()

  console.log("Initial Business Data:", initialBusinessData);

  //  🔹 Prefill form when editing
   useEffect(() => {
    if (initialBusinessData) {
      setBusinessName(initialBusinessData.name || "");
      setWhatsappNumber(initialBusinessData.whatsapp_number || "");
      setContent(initialBusinessData.content || "");
    }
  }, [initialBusinessData]);

  //  // Handle image select + preview
  //  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files ? Array.from(e.target.files) : []
  // const newImages = files.map((file) => ({ file, description: "" }))
  // setImages((prev) => [...prev, ...newImages.map(img => img.file)])
  // const previews = files.map((file) => URL.createObjectURL(file))
  // setImagePreviews((prev) => [...prev, ...previews])
  // }

   // Handle image select
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      description: ""
    }))
    setImages((prev) => [...prev, ...newImages])
  }

   // Update description
   const updateDescription = (index: number, desc: string) => {
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, description: desc } : img
      )
    )
  }

  // const handleSubmit = async () => {

  //   if (!businessName || !whatsappNumber || !content) {
  //     setStatus("❌ Please fill all fields");
  //     return;
  //   }
  //   setStatus("Saving...");
  //   try {
  //     const token = localStorage.getItem("token");
  //     const isEditMode = !!initialBusinessData?.id;

  //     const res = await fetch(isEditMode ? `/api/businesses/${initialBusinessData.id}` : "/api/save-knowledge", {
  //       method: isEditMode ? "PUT" : "POST",
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`  // ✅ Include token
  //       },
  //       body: JSON.stringify({
  //         name: businessName,
  //         whatsapp_number: whatsappNumber,
  //         content,
  //       }),
  //     });
  //     const savedBusiness = await res.json();
  //     if (res.ok) {
  //       setStatus("✅ Saved successfully");
  //       // setContent("");
  //       // Redirect to dashboard with new business info
  //       navigate("/dashboard", { state: { newBusiness: savedBusiness } });
  //     } else {
  //       const err = await res.text();
  //       setStatus(`❌ Error: ${err}`);
  //     }
      
  //     // Upload each image + description
  //     for (const img of images) {
  //       const formData = new FormData()
  //       formData.append("businessId", savedBusiness.id)
  //       formData.append("description", img.description)
  //       formData.append("image", img.file)

  //       await fetch("/api/save-image", {
  //         method: "POST",
  //         headers: { Authorization: `Bearer ${token}` },
  //         body: formData,
  //       })
  //     }

  //     setStatus("✅ Saved successfully")
  //     setContent("")
  //     setImages([])
  //     navigate("/dashboard", { state: { newBusiness: savedBusiness } })
  //   } catch (err) {
  //     setStatus(`❌ ${err}`);
  //   }
  // };

  const handleSubmit = async () => {
    if (!businessName || !whatsappNumber || !content) {
      setStatus("❌ Please fill all fields");
      return;
    }
  
    setStatus("Saving...");
  
    try {
      const token = localStorage.getItem("token");

      const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "/api"; // fallback to vite proxy in dev
  
      const res = await fetch(`${API_BASE}/save-knowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: businessName,
          whatsapp_number: whatsappNumber,
          content,
        }),
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      const savedBusiness = await res.json();
  
      // ✅ If you also have images to upload:
      for (const img of images) {
        const formData = new FormData();
        formData.append("businessId", savedBusiness.id);
        formData.append("description", img.description);
        formData.append("image", img.file);

        const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "/api"; // fallback to vite proxy in dev
  
        await fetch(`${API_BASE}/save-image`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }
  
      setStatus("✅ Saved successfully");
      navigate("/dashboard", { state: { newBusiness: savedBusiness } });
  
    } catch (err) {
      setStatus(`❌ ${err}`);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked")
    navigate(-1) // Navigate back to the previous page
  }

  // Remove image before saving
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    // setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const sampleQuestions = [
    "What are your business hours?",
    "How much does delivery cost?",
    "Do you have vegetarian options?",
    "How can I place an order?",
  ]

  const FloatingIcons = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + Math.random() * 3}s`,
          }}
        >
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center">
            <ChatIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative">
      <FloatingIcons />

      {/* Navigation */}
      <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              >
                <ArrowBack className="w-4 h-4 sm:w-5 sm:h-5 text-[#075E54]" />
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                  <SmartToy className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-[#075E54]">AI Knowledge Setup</span>
                  <div className="text-xs text-gray-500 hidden sm:block">Train your WhatsApp AI assistant</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 border border-[#25D366] text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all text-xs sm:text-sm touch-manipulation"
              >
                <Preview className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{isPreviewMode ? "Edit Mode" : "Preview"}</span>
                <span className="sm:hidden">{isPreviewMode ? "Edit" : "Preview"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Business className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h1 className="text-xl sm:text-2xl font-bold">Business Information</h1>
                </div>
                <p className="text-white/90 text-sm sm:text-base">Set up your WhatsApp AI assistant in minutes</p>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* Business Name */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#075E54]">
                    <Business className="w-4 h-4 sm:w-5 sm:h-5" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bright Minds Tuition Centre"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-base sm:text-lg touch-manipulation"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#075E54]">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    WhatsApp Business Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                        <ChatIcon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g., +60 12-345 6789"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-base sm:text-lg touch-manipulation"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>This should be your WhatsApp Business account number</span>
                  </div>
                </div>

                {/* Knowledge Content */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#075E54]">
                    <SmartToy className="w-4 h-4 sm:w-5 sm:h-5" />
                    AI Knowledge Base
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Tell your AI about your business... 

                        Examples:
                        • Business hours: Monday-Friday 9AM-6PM
                        • Services: Math tutoring, Science classes, Exam prep
                        • Pricing: $50/hour for individual sessions, $30/hour for group classes
                        • Location: 123 Main Street, City Center
                        • Special offers: 10% discount for new students
                        • Contact: Call us at +60 12-345 6789 for bookings

                        The more details you provide, the better your AI will assist customers!"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-base sm:text-lg resize-none touch-manipulation"
                    />
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs sm:text-sm text-gray-400">
                      {content.length} characters
                    </div>
                  </div>
                </div>

                {/* 🔹 Image Upload Section */}
        <div className="space-y-2 sm:space-y-3">
          <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#075E54]">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Upload Business Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                       file:rounded-full file:border-0 file:text-sm file:font-semibold 
                       file:bg-[#25D366]/10 file:text-[#075E54] hover:file:bg-[#25D366]/20"
          />

          {/* 🔹 Preview Selected Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
              {images.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src?.preview} alt={`Preview ${i}`} className="rounded-lg border shadow-sm" />
                  <input
                  type="text"
                  placeholder="Short description for AI retrieval"
                  value={src?.description}
                  onChange={(e) => updateDescription(i, e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                  {status && (
                    <div
                      className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium ${
                        status.includes("✅")
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : status.includes("❌")
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {status.includes("✅") && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {status}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                    <button
                      onClick={handleBack}
                      className="px-4 py-3 sm:px-6 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all font-medium text-sm sm:text-base touch-manipulation"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!businessName || !whatsappNumber || !content}
                      className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 bg-[#25D366] text-white rounded-lg sm:rounded-xl hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium shadow-lg text-sm sm:text-base touch-manipulation"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      Save & Activate AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Tips Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                <h3 className="text-base sm:text-lg font-bold text-[#075E54]">Pro Tips</h3>
              </div>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#25D366] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Be specific:</strong> Include exact prices, hours, and contact details
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#25D366] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Use examples:</strong> Show how customers typically interact with you
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#25D366] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Update regularly:</strong> Keep information current for best results
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <ChatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" />
                <h3 className="text-base sm:text-lg font-bold text-[#075E54]">AI Preview</h3>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  Your AI will be able to answer questions like:
                </div>

                {sampleQuestions.map((question, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2 sm:p-3 border-l-4 border-[#25D366]">
                    <div className="text-xs sm:text-sm text-gray-700">"{question}"</div>
                  </div>
                ))}

                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[#25D366]/10 rounded-lg border border-[#25D366]/20">
                  <div className="text-xs sm:text-sm text-[#075E54] font-medium">
                    💡 The more details you provide, the smarter your AI becomes!
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-[#075E54] mb-3 sm:mb-4">What to Expect</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Setup Time</span>
                  <span className="text-xs sm:text-sm font-bold text-[#25D366]">Less than 5 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Response Speed</span>
                  <span className="text-xs sm:text-sm font-bold text-[#25D366]">Less than 2 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Accuracy Rate</span>
                  <span className="text-xs sm:text-sm font-bold text-[#25D366]">95%+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Availability</span>
                  <span className="text-xs sm:text-sm font-bold text-[#25D366]">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeEditor
