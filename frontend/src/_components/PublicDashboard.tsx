"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Menu,
  Chat as ChatIcon,
  Login as LogIn,
  Schedule,
  Analytics,
  Settings,
} from "@mui/icons-material";
// import { FloatingIcons } from "./FloatingIcons";

const PublicDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] overflow-hidden">
      <FloatingIcons />

      {/* Navigation */}
      <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-[#075E54]">
                  ReplyMate AI
                </span>
                <div className="text-xs text-gray-500 hidden sm:block">
                  WhatsApp Business Integration
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                Features
              </button>
              <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                Pricing
              </button>
              <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                About
              </button>
              <button
                className="flex items-center gap-2 text-[#075E54] border border-[#25D366] rounded-full px-3 py-2 hover:bg-[#25D366] hover:text-white transition-all"
                onClick={handleLoginClick}
              >
                <LogIn className="h-3 w-3" />
                Login
              </button>
              <button
                className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2 hover:bg-[#128C7E] transition-all shadow-lg"
                onClick={handleSignupClick}
              >
                Get Started Free
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 touch-manipulation"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20">
            <div className="px-3 sm:px-4 py-4 space-y-2">
              <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                Features
              </button>
              <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                Pricing
              </button>
              <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                About
              </button>
              <button
                className="w-full text-left gap-2 border border-[#25D366] rounded-full py-3 px-4 flex items-center"
                onClick={handleLoginClick}
              >
                <LogIn className="h-4 w-4" /> Login
              </button>
              <button
                className="w-full text-left gap-2 bg-[#25D366] text-white rounded-full py-3 px-4 flex items-center"
                onClick={handleSignupClick}
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Transform Your <span className="text-[#25D366]">WhatsApp Business</span> with AI Power
        </h1>
        <p className="text-lg text-white/80 max-w-3xl mx-auto mb-6">
          Automate customer conversations, boost response rates, and grow your
          business with intelligent WhatsApp bots.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition"
            onClick={handleLoginClick}
          >
            Start Free Trial
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Why Choose ReplyMate AI?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Built specifically for WhatsApp Business with enterprise-grade AI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: ChatIcon, title: "Smart Conversations", desc: "AI understands context and intent" },
              { icon: Schedule, title: "24/7 Availability", desc: "Never miss a customer inquiry" },
              { icon: Analytics, title: "Deep Analytics", desc: "Track performance and optimize" },
              { icon: Settings, title: "Easy Setup", desc: "Connect in under 5 minutes" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#25D366] mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;
