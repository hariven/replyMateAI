"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chat as ChatIcon,
  //   Settings,
  Logout as LogoutIcon,
  Person,
  Badge,
  CheckCircle,
  Phone,
  Add,
} from "@mui/icons-material";
import Button from "@mui/material/Button";

interface KB {
  id: number;
  business_id: number;
  content: string;
}

interface Business {
  id: number;
  name: string;
  whatsapp_number: string;
  kb?: KB[];
}

const PrivateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = React.useState<Business[]>([]);
  // const { id } = useParams<{ id: string }>();

  console.log(businesses, "businesses");

  const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "/api"; // fallback to vite proxy in dev

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${API_BASE}/businesses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch businesses");
        }
        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, [API_BASE, navigate]);

  const handleLogout = () => {
    // Clear auth tokens / state
    localStorage.removeItem("token");
    navigate("/");
  };

  //   const handleBusinessClick = (id: number) => {
  //     navigate(`/business/${id}`);
  //   };

  const handleAddBusiness = () => navigate("/kb-editor");

  console.log(businesses, "businesses");

  const FloatingIcons = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <ChatIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366]">
      <FloatingIcons />

      {/* Nav */}
      <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
              <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-[#075E54]">
                ReplyMate AI
              </span>
              <div className="text-xs text-gray-500 hidden sm:block">
                Dashboard
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#25D366] rounded-full flex items-center justify-center">
              <Person className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <button
              onClick={handleLogout}
              className="text-[#075E54] hover:text-[#25D366] font-medium px-2 py-1 sm:px-4 sm:py-2"
            >
              {LogoutIcon && (
                <LogoutIcon className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Businesses */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex mb-6 justify-between items-center">
          <h2 className="text-2xl font-bold text-white items-center ">
            Your WhatsApp Businesses
          </h2>
          <Button
            onClick={handleAddBusiness}
            className="!sm:text-lg !bg-white !text-black p-2 "
          >
            <Add className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-white" />
            Add New Business
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {businesses.map((biz, i) => (
            <div
              key={`${biz.id}-${i}`}
              className="group p-4 sm:p-6 border-2 border-gray-100 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:border-[#25D366] hover:shadow-xl transition-all duration-300 touch-manipulation"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ChatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#075E54] mb-2 group-hover:text-[#25D366] transition-colors">
                  {biz.name}
                </h3>
                <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  {biz.whatsapp_number}
                </span>
              </div>

              {/* <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">0</div>
                  <div className="text-xs text-gray-600">Conversations</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-xl font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
              </div> */}

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col text-xs sm:text-sm">
                  <span className="text-gray-500">Last active:</span>
                  <span className="text-[#25D366] font-medium">Just now</span>
                </div>
                <button
                  onClick={() =>
                    navigate(`/kb-editor`, {
                      state: { business: biz,
                        knowledge_base_embeddings: biz.kb, // ✅ pass KB if exists
                       },
                    })
                  }
                  className="px-3 py-1 bg-[#25D366] text-white rounded-full text-xs sm:text-sm hover:bg-[#128C7E] transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}

          {/* Add Business Card */}
          <div
            onClick={handleAddBusiness}
            className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300 cursor-pointer min-h-[200px] sm:min-h-[280px] touch-manipulation"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#25D366] group-hover:scale-110 transition-all">
              <Add className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-600 group-hover:text-[#25D366] mb-1 sm:mb-2">
              Connect New Business
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600">
              Set up WhatsApp AI in under 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateDashboard;
