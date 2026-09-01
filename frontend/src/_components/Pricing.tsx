"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Chat,
  Check,
  Close,
  HelpOutline,
  X,
  Menu,
  Login as LogIn,
} from "@mui/icons-material";

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = (plan: string) => {
    navigate("/signup", { state: { plan } });
  };

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

  const plans = [
  {
    name: "Growth",
    description: "Everything you need to automate customer conversations with AI",
    monthlyPrice: 500,
    yearlyPrice: 400, // 20% discount
    features: [
      "GPT-4o AI model",
      "1 WhatsApp Business number",
      "Unlimited knowledge base",
      "Advanced analytics dashboard",
      "Priority email & chat support (8am-10pm MYT)",
      "Human handoff capability",
      "Basic webhooks",
      "Unlimited WhatsApp service messages",
      "GDPR compliant",
      "Setup assistance",
    ],
    limitations: [
      "No custom AI fine-tuning",
      "No on-premise deployment",
      "No dedicated account manager",
      "Standard SLA (99.0%)",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "border-[#25D366]/50 bg-[#25D366]/10",
    badge: "Recommended",
  }
];

  const formatPrice = (price: number) => `RM ${price}`;

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
            onClick={() => handleSignupClick("growth")}
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
          onClick={() => handleSignupClick("growth")}
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
          <span className="text-white/80 text-sm font-medium">14-day free trial • No credit card required • Cancel anytime</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Simple, <span className="relative inline-block text-[#25D366] after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#25D366] after:transition-all after:duration-500 hover:after:w-full">Transparent Pricing</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
          Choose the plan that fits your business. All plans include a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
          <span className={`text-white/70 font-medium ${!isYearly ? 'text-white' : ''}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${
              isYearly ? 'bg-[#25D366]' : 'bg-white/20'
            }`}
            aria-label={isYearly ? "Switch to monthly billing" : "Switch to yearly billing"}
          >
            <span
              className={`absolute w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                isYearly ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-white/70 font-medium ${isYearly ? 'text-white' : ''}`}>
            Yearly
            <span className="ml-1 text-xs bg-[#25D366] text-white px-1.5 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 ${plan.color} transition-all duration-300 ${plan.popular ? 'ring-2 ring-[#25D366]/50 shadow-2xl scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-white">
                        {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                      </span>
                      <span className="text-white/60">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-[#25D366] text-sm mt-1">
                        Billed yearly: {formatPrice(isYearly ? plan.yearlyPrice * 12 : plan.monthlyPrice * 12)}/year
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleSignupClick(plan.name.toLowerCase())}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.popular
                        ? 'bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3 text-white/80 text-sm">
                        <Check className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, j) => (
                      <div key={j} className="flex items-start gap-3 text-white/40 text-sm line-through">
                        <Close className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What's included in the 14-day free trial?",
                a: "Full access to all features of your selected plan. No credit card required. Cancel anytime during the trial without being charged.",
              },
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately, downgrades take effect at the next billing cycle.",
              },
              {
                q: "What counts as a message?",
                a: "Each incoming or outgoing WhatsApp message counts as one message. Media messages (images, documents) also count as one message each.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. The 5-minute setup is included free. Custom integrations may have professional services fees.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and online banking transfers.",
              },
              {
                q: "Do you offer discounts for non-profits?",
                a: "Yes! We offer 50% off for registered non-profits. Contact sales with your documentation to apply.",
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none">
                  <span className="text-white font-medium text-base pr-4">{faq.q}</span>
                  <HelpOutline className="w-5 h-5 text-white/50 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-4 sm:px-6 pb-6 text-white/70 animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Our team is here to help you find the right plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="relative overflow-hidden bg-[#25D366] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300"
                onClick={() => handleSignupClick("growth")}
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                className="relative overflow-hidden border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition-all duration-300"
                onClick={() => navigate("/contact")}
              >
                <span className="relative z-10">Contact Sales</span>
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

export default Pricing;