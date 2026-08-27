"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Chat, Shield, Rocket, Lightbulb, Group, Language, Star, X, Menu, Login as LogIn } from "@mui/icons-material";

const About: React.FC = () => {
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
          <span className="text-white/80 text-sm font-medium">Building the future of business communication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          About <span className="relative inline-block text-[#25D366] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#25D366] after:transition-all after:duration-500 hover:after:w-full">ReplyMate AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
          We're on a mission to revolutionize how businesses connect with their customers through intelligent WhatsApp automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="relative overflow-hidden bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
            onClick={handleLoginClick}
          >
            <span className="relative z-10">Join Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className="relative overflow-hidden border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
            onClick={() => navigate("/contact")}
          >
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Our Story */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-1/2 sm:w-full mb-6 sm:mb-0">
                <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22/%3E%3C/svg%3E')]"/>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 to-[transparent] pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center absolute -top-4 left-1/2 -translate-x-4">
                      <Chat className="w-6 h-6 text-[#25D366]" />
                    </div>
                    <img
                      alt="ReplyMate AI Team"
                      className="object-cover w-full h-full"
                      src="https://images.unsplash.com/photo-1551836022-de5d61b3f65f?auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 sm:w-full space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Story</h2>
                <p className="text-white/80 text-lg">
                  ReplyMate AI was founded in 2025 by a team of entrepreneurs and engineers who saw a fundamental problem: businesses were struggling to manage the ever-growing volume of WhatsApp messages while trying to maintain personal, meaningful connections with customers.
                </p>
                <p className="text-white/80 text-lg mt-4">
                  What started as a simple auto-responder tool has evolved into a comprehensive AI-powered platform that combines cutting-edge natural language processing with deep business intelligence. Today, we help hundreds of businesses automate routine conversations while preserving the human touch that builds lasting customer relationships.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/70 text-lg">
                To empower every business, regardless of size, with the tools to provide exceptional customer experiences on WhatsApp through intelligent automation that feels human.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20 bg-white/5 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Security & Privacy",
                description: "We treat your data with the same care as our own, implementing bank-level encryption and strict privacy controls.",
              },
              {
                icon: Rocket,
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI and automation to keep you ahead of the curve.",
              },
              {
                icon: Lightbulb,
                title: "Customer Success",
                description: "Your success is our success. We're here to support you every step of the way.",
              },
              {
                icon: Group,
                title: "Trust & Transparency",
                description: "We believe in open communication and building long-term relationships based on mutual trust.",
              },
              {
                icon: Language,
                title: "Global Impact",
                description: "We're building tools that work for businesses everywhere, breaking down language and geographical barriers.",
              },
              {
                icon: Star,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from our technology to our customer support.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 flex-shrink-0">
                  <value.icon className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Team */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Meet the Team
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-8">
            Our diverse team brings together expertise in AI, software engineering, customer experience, and business strategy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                bio: "Former tech lead at a Fortune 500 company with 10+ years experience in AI and enterprise software.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Samira Rodriguez",
                role: "CTO & Lead AI Engineer",
                bio: "PhD in Machine Learning with expertise in natural language processing and conversational AI.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "James Wilson",
                role: "Head of Product",
                bio: "Product specialist with background in UX design and customer journey optimization.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Maria Garcia",
                role: "Customer Success Lead",
                bio: "Customer experience expert passionate about helping businesses thrive through better communication.",
                image: "https://images.unsplash.com/photo-1494790108755-2b16b3d7a091?auto=format&fit=crop&w=400&q=80",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22/%3E%3C/svg%3E')]"/>
                  <img
                    alt={member.name}
                    className="object-cover w-full h-full rounded-full"
                    src={member.image}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-white/60">{member.role}</p>
                <p className="text-white/70 text-sm mt-2">{member.bio}</p>
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
              Ready to Transform Your Customer Communications?
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Join the growing number of businesses that are already seeing remarkable results with ReplyMate AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="relative overflow-hidden bg-[#25D366] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
                onClick={handleLoginClick}
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                className="relative overflow-hidden border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
                onClick={() => navigate("/contact")}
              >
                <span className="relative z-10">Contact Us</span>
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

export default About;