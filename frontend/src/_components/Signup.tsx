// import type React from "react"
// import { useState } from "react"
// import {
//   Chat as ChatIcon,
//   Email,
//   Lock,
//   Person,
//   Business,
//   Phone,
//   Visibility,
//   VisibilityOff,
//   Google,
//   Facebook,
//   ArrowForward,
//   CheckCircle,
//   Security,
// } from "@mui/icons-material"

// interface SignupProps {
//   // onNavigate: (page: "login" | "signup" | "dashboard" | "kb-editor") => void
//   // onSignup: () => void
// }

// const Signup: React.FC<SignupProps> = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     businessName: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [acceptTerms, setAcceptTerms] = useState(false)
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}
    
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email"
//     }
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
//     if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters"
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords don't match"
//     }
//     if (!acceptTerms) {
//       newErrors.terms = "Please accept the terms and conditions"
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!validateForm()) return
    
//     setIsLoading(true)
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       onSignup() // Call the onSignup prop to update authentication state
//     }, 2000)
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value })
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: "" })
//     }
//   }

//   const handleSocialSignup = (provider: string) => {
//     console.log(`Signup with ${provider}`)
//     setIsLoading(true)
//     setTimeout(() => {
//       setIsLoading(false)
//       onSignup() // Call the onSignup prop to update authentication state
//     }, 1000)
//   }

//   // Floating WhatsApp Icons Animation
//   const FloatingIcons = () => (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//       {[...Array(12)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute animate-float opacity-5"
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${i * 1.5}s`,
//             animationDuration: `${6 + Math.random() * 3}s`,
//           }}
//         >
//           <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center">
//             <ChatIcon className="w-2 h-2 sm:w-4 sm:h-4 text-white" />
//           </div>
//         </div>
//       ))}
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative flex items-center justify-center p-3 sm:p-4">
//       <FloatingIcons />
      
//       {/* Main Container */}
//       <div className="relative z-10 w-full max-w-lg">
//         {/* Logo Section */}
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
//             <ChatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Join ReplyMate AI</h1>
//           <p className="text-white/80 text-sm sm:text-base">Start automating your WhatsApp business today</p>
//         </div>

//         {/* Signup Form */}
//         <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
//                   <Person className="w-4 h-4" />
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="John"
//                   value={formData.firstName}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
//                     errors.firstName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
//                   }`}
//                 />
//                 {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Doe"
//                   value={formData.lastName}
//                   onChange={(e) => handleInputChange("lastName", e.target.value)}
//                   className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
//                     errors.lastName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
//                   }`}
//                 />
//                 {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
//                 <Email className="w-4 h-4" />
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
//                   errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
//                 }`}
//               />
//               {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//             </div>

            // {/* Phone and Business Name */}
            // <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            //   <div className="space-y-2">
            //     <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
            //       <Phone className="w-4 h-4" />
            //       Phone
            //     </label>
            //     <input
            //       type="tel"
            //       placeholder="+1 234 567 8900"
            //       value={formData.phone}
            //       onChange={(e) => handleInputChange("phone", e.target.value)}
            //       className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
            //         errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
            //       }`}
            //     />
            //     {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            //   </div>
              
            //   <div className="space-y-2">
            //     <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
            //       <Business className="w-4 h-4" />
            //       Business
            //     </label>
            //     <input
            //       type="text"
            //       placeholder="My Business"
            //       value={formData.businessName}
            //       onChange={(e) => handleInputChange("businessName", e.target.value)}
            //       className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
            //         errors.businessName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
            //       }`}
            //     />
            //     {errors.businessName && <p className="text-red-500 text-xs">{errors.businessName}</p>}
            //   </div>
            // </div>

//             {/* Password Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
//                   <Lock className="w-4 h-4" />
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Min. 8 characters"
//                     value={formData.password}
//                     onChange={(e) => handleInputChange("password", e.target.value)}
//                     className={`w-full px-3 py-3 pr-10 sm:px-4 sm:pr-12 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
//                       errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
//                   >
//                     {showPassword ? <VisibilityOff className="w-4 h-4" /> : <Visibility className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
//                   <Security className="w-4 h-4" />
//                   Confirm
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Repeat password"
//                     value={formData.confirmPassword}
//                     onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                     className={`w-full px-3 py-3 pr-10 sm:px-4 sm:pr-12 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
//                       errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
//                   >
//                     {showConfirmPassword ? <VisibilityOff className="w-4 h-4" /> : <Visibility className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="space-y-2">
//               <label className="flex items-start gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={acceptTerms}
//                   onChange={(e) => {
//                     setAcceptTerms(e.target.checked)
//                     if (errors.terms) setErrors({ ...errors, terms: "" })
//                   }}
//                   className="mt-1 w-4 h-4 text-[#25D366] border-2 border-gray-300 rounded focus:ring-[#25D366] focus:ring-2"
//                 />
//                 <span className="text-xs sm:text-sm text-gray-600">
//                   I agree to the{" "}
//                   <button type="button" className="text-[#25D366] hover:underline">
//                     Terms of Service
//                   </button>{" "}
//                   and{" "}
//                   <button type="button" className="text-[#25D366] hover:underline">
//                     Privacy Policy
//                   </button>
//                 </span>
//               </label>
//               {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
//             </div>

//             {/* Signup Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2 touch-manipulation"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <Person className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Create Account
//                   <ArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-1 border-t border-gray-200"></div>
//             <span className="px-4 text-gray-500 text-xs sm:text-sm">or sign up with</span>
//             <div className="flex-1 border-t border-gray-200"></div>
//           </div>

//           {/* Social Signup */}
//           <div className="grid grid-cols-2 gap-3 sm:gap-4">
//             <button
//               onClick={() => handleSocialSignup("Google")}
//               disabled={isLoading}
//               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm font-medium touch-manipulation"
//             >
//               <Google className="w-4 h-4 text-red-500" />
//               <span className="hidden sm:inline">Google</span>
//             </button>
//             <button
//               onClick={() => handleSocialSignup("Facebook")}
//               disabled={isLoading}
//               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm font-medium touch-manipulation"
//             >
//               <Facebook className="w-4 h-4 text-blue-600" />
//               <span className="hidden sm:inline">Facebook</span>
//             </button>
//           </div>

//           {/* Login Link */}
//           <div className="text-center mt-6 pt-6 border-t border-gray-100">
//             <p className="text-gray-600 text-xs sm:text-sm">
//               Already have an account?{" "}
//               <button
//                 onClick={() => onNavigate("login")}
//                 className="text-[#25D366] hover:text-[#128C7E] font-semibold touch-manipulation"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="text-center mt-6 sm:mt-8">
//           <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
//             <CheckCircle className="w-4 h-4 text-[#25D366]" />
//             <span>Free 14-day trial • No credit card required</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chat as ChatIcon,
  Email,
  Lock,
  Person,
  // Business,
  // Phone,
  Visibility,
  VisibilityOff,
  ArrowForward,
  // CheckCircle,
  Security,
  Business,
  Phone,
} from "@mui/icons-material";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Form data:", formData);
  
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }
  
    console.log("Validation passed");
    setIsLoading(true);
    const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "/api"; // fallback to vite proxy in dev
  
    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server error:", errorData);
        setErrors({ server: errorData.message || "Signup failed" });
        setIsLoading(false);
        return;
      }
  
      console.log("Signup successful");
      navigate("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrors({ server: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative flex items-center justify-center p-3 sm:p-4">
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
            <ChatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Join ReplyMate AI</h1>
          <p className="text-white/80 text-sm sm:text-base">Start automating your WhatsApp business today</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  <Person className="w-4 h-4" />
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                    errors.firstName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                    errors.lastName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                <Email className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Phone and Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                    errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  <Business className="w-4 h-4" />
                  Business
                </label>
                <input
                  type="text"
                  placeholder="My Business"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                    errors.businessName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
                {errors.businessName && <p className="text-red-500 text-xs">{errors.businessName}</p>}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full px-3 py-3 pr-10 sm:px-4 sm:pr-12 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                      errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
                  >
                    {showPassword ? <VisibilityOff className="w-4 h-4" /> : <Visibility className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#075E54]">
                  <Security className="w-4 h-4" />
                  Confirm
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full px-3 py-3 pr-10 sm:px-4 sm:pr-12 border-2 rounded-lg focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm touch-manipulation ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#25D366]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
                  >
                    {showConfirmPassword ? <VisibilityOff className="w-4 h-4" /> : <Visibility className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: "" });
                  }}
                  className="mt-1 w-4 h-4 text-[#25D366] border-2 border-gray-300 rounded focus:ring-[#25D366] focus:ring-2"
                />
                <span className="text-xs sm:text-sm text-gray-600">
                  I agree to the{" "}
                  <button type="button" className="text-[#25D366] hover:underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-[#25D366] hover:underline">
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2 touch-manipulation"
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Person className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Account
                  <ArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Server Error */}
          {errors.server && <p className="text-red-500 text-center mt-4">{errors.server}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;