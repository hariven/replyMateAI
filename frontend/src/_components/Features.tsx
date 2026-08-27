"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Chat,
  Schedule,
  Analytics,
  Settings,
  Security,
  Language,
  Speed,
  Link as LinkIcon,
  Support,
  Shield,
  Cloud,
  AutoAwesome,
  X,
  Menu,
  Login as LogIn
} from "@mui/icons-material";

const Features: React.FC = () => {
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
            <Chat className="w-5 h-5 text-white" />
          </div>
        </div>
      ))}
    </div>
  );

  const features = [
    {
      icon: Chat,
      title: "Smart Conversations",
      description:
        "GPT-4o-mini powered AI understands context, intent, and sentiment. Handles complex multi-turn conversations naturally.",
      details: [
        "Context-aware responses",
        "Multi-language support",
        "Sentiment detection",
        "Conversation memory",
      ],
    },
    {
      icon: Schedule,
      title: "24/7 Availability",
      description:
        "Your business never sleeps. Automated responses ensure customers get instant answers anytime, anywhere.",
      details: [
        "Instant auto-replies",
        "After-hours coverage",
        "Holiday support",
        "Queue management",
      ],
    },
    {
      icon: AutoAwesome,
      title: "RAG Knowledge Base",
      description:
        "Upload documents, FAQs, and images. AI retrieves relevant information using vector search (pgvector) for accurate answers.",
      details: [
        "Document upload (PDF, TXT)",
        "Image support with OCR",
        "Vector similarity search",
        "Real-time updates",
      ],
    },
    {
      icon: Analytics,
      title: "Deep Analytics",
      description:
        "Track conversation metrics, response accuracy, customer satisfaction, and bot performance in real-time dashboards.",
      details: [
        "Message volume trends",
        "Response accuracy rates",
        "Customer satisfaction scores",
        "Peak hours analysis",
      ],
    },
    {
      icon: Settings,
      title: "5-Minute Setup",
      description:
        "Connect your WhatsApp Business Account via Meta Cloud API. No coding required - just scan QR and go live.",
      details: [
        "Meta Cloud API integration",
        "QR code verification",
        "Webhook auto-configuration",
        "Template management",
      ],
    },
    {
      icon: Security,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, GDPR compliance, and data isolation. Your conversations and knowledge base stay private.",
      details: [
        "End-to-end encryption",
        "GDPR compliant",
        "Data residency options",
        "Audit logs",
      ],
    },
    {
      icon: Language,
      title: "Multi-Language Support",
      description:
        "Communicate with customers in 50+ languages. Automatic language detection and seamless translation.",
      details: [
        "Auto language detection",
        "50+ languages supported",
        "Real-time translation",
        "Localized responses",
      ],
    },
    {
      icon: Speed,
      title: "Lightning Fast",
      description:
        "Sub-second response times with edge caching and optimized inference. Scale to millions of conversations.",
      details: [
        "<500ms response time",
        "Auto-scaling infrastructure",
        "Edge deployment",
        "99.9% uptime SLA",
      ],
    },
    {
      icon: LinkIcon,
      title: "Seamless Integrations",
      description:
        "Connect with your CRM, helpdesk, and e-commerce platforms. Sync conversations and customer data automatically.",
      details: [
        "CRM sync (HubSpot, Salesforce)",
        "Helpdesk integration",
        "E-commerce platforms",
        "Custom webhooks",
      ],
    },
    {
      icon: Support,
      title: "Human Handoff",
      description:
        "Seamlessly transfer complex conversations to human agents. Maintain context and conversation history.",
      details: [
        "Live agent transfer",
        "Conversation context preserved",
        "Agent notifications",
        "Queue prioritization",
      ],
    },
    {
      icon: Shield,
      title: "Spam Protection",
      description:
        "AI-powered spam detection filters out unwanted messages before they reach your team or bot.",
      details: [
        "ML-based spam detection",
        "Custom block rules",
        "Rate limiting",
        "Threat intelligence",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description:
        "Built for the cloud with containerized deployment, auto-scaling, and multi-region support for global businesses.",
      details: [
        "Kubernetes ready",
        "Multi-region deployment",
        "Auto-scaling groups",
        "Blue-green deployments",
      ],
    },
    {
      icon: AutoAwesome,
      title: "Continuous Learning",
      description:
        "Bot improves over time with feedback loops. Review conversations, flag errors, and retrain with one click.",
      details: [
        "Feedback collection",
        "Error flagging",
        "One-click retrain",
        "A/B testing",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%200v60M0%2036h60M6.364%206.364l47.272%2047.272M12.727%2012.727l34.546%2034.546M19.091%2019.091l21.818%2021.818M25.455%2025.455l9.091%209.091Z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"/>
      </div>

      <FloatingIcons />

      {/* Navigation */}
<div className="relative z-50">
  <nav className="relative bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
      <div className="flex justify-between items-center h-14 sm:h-16">

        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
            <Chat className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <Link
            to="/features"
            className="text-[#25D366] font-medium px-3 py-2"
          >
            Features
          </Link>

          <Link
            to="/pricing"
            className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2"
          >
            Pricing
          </Link>

          <Link
            to="/about"
            className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2"
          >
            About
          </Link>

          <button
            className="flex items-center gap-2 text-[#075E54] border border-[#25D366] rounded-full px-3 py-2 hover:bg-[#25D366] hover:text-white transition-all duration-300"
            onClick={handleLoginClick}
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>

          <button
            className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2 hover:bg-[#128C7E] transition-all duration-300 shadow-lg"
            onClick={handleSignupClick}
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 touch-manipulation"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-[#075E54]" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-[#075E54]" />
            )}
          </button>
        </div>

      </div>
    </div>
  </nav>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
      <div className="px-3 sm:px-4 py-4 space-y-2">

        <Link
          to="/features"
          onClick={() => setIsMenuOpen(false)}
          className="block w-full text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50"
        >
          Features
        </Link>

        <Link
          to="/pricing"
          onClick={() => setIsMenuOpen(false)}
          className="block w-full text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50"
        >
          Pricing
        </Link>

        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          className="block w-full text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50"
        >
          About
        </Link>

        <button
          className="w-full text-left border border-[#25D366] rounded-full py-3 px-4 flex items-center gap-2"
          onClick={handleLoginClick}
        >
          <LogIn className="h-4 w-4" />
          Login
        </button>

        <button
          className="w-full text-left bg-[#25D366] text-white rounded-full py-3 px-4 flex items-center gap-2"
          onClick={handleSignupClick}
        >
          Get Started Free
        </button>

      </div>
    </div>
  )}
</div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">New: RAG Knowledge Base with Image Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Powerful <span className="relative inline-block text-[#25D366] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#25D366] after:transition-all after:duration-500 hover:after:w-full">Features</span> for Modern WhatsApp Business
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
          Everything you need to automate, analyze, and scale your WhatsApp customer conversations with AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="relative overflow-hidden bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
            onClick={handleSignupClick}
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className="relative overflow-hidden border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22/%3E%3C/svg%3E')]"/>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                        <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your WhatsApp Business?
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses automating their customer conversations with ReplyMate AI.
              Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="relative overflow-hidden bg-[#25D366] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
                onClick={handleSignupClick}
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                className="relative overflow-hidden border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
                onClick={() => navigate("/login")}
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <Chat className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ReplyMate AI</span>
            </div>
            <p className="text-white/60 text-sm">© 2025 ReplyMate AI. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;