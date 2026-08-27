"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%200v60M0%2036h60M6.364%206.364l47.272%2047.272M12.727%2012.727l34.546%2034.546M19.091%2019.091l21.818%2021.818M25.455%2025.455l9.091%209.091Z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"/>
      </div>

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
              <Link
                to="/features"
                className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 transition-colors duration-200"
              >
                About
              </Link>
              <button
                className="flex items-center gap-2 text-[#075E54] border border-[#25D366] rounded-full px-3 py-2 hover:bg-[#25D366] hover:text-white transition-all duration-300"
                onClick={handleLoginClick}
              >
                <LogIn className="h-3 w-3" />
                Login
              </button>
              <button
                className="relative overflow-hidden flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2 hover:bg-[#128C7E] transition-all duration-300 shadow-lg"
                onClick={handleSignupClick}
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 touch-manipulation transition-transform duration-200"
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
              <Link
                to="/features"
                className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                About
              </Link>
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
          Transform Your <span className="relative inline-block text-[#25D366] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#25D366] after:transition-all after:duration-500 hover:after:w-full">WhatsApp Business</span> with AI Power
        </h1>
        <p className="text-lg text-white/80 max-w-3xl mx-auto mb-6">
          Automate customer conversations, boost response rates, and grow your
          business with intelligent WhatsApp bots.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="relative overflow-hidden bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
            onClick={handleLoginClick}
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className="relative overflow-hidden border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
          >
            <span className="relative z-10">Watch Demo</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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
                className="relative overflow-hidden bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22/%3E%3C/svg%3E')]"/>
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#25D366] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
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
