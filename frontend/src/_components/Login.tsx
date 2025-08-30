// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import {
// //   Chat as ChatIcon,
// //   Email,
// //   Lock,
// //   Visibility,
// //   VisibilityOff,
// //   Google,
// //   Facebook,
// //   ArrowForward,
// //   CheckCircle,
// //   Person,
// // } from "@mui/icons-material"

// // interface LoginProps {
// //   onNavigate: (page: "login" | "signup" | "dashboard" | "kb-editor") => void
// //   onLogin: () => void
// // }

// // const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

// //   const validateForm = () => {
// //     const newErrors: { email?: string; password?: string } = {}
    
// //     if (!email) {
// //       newErrors.email = "Email is required"
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       newErrors.email = "Please enter a valid email"
// //     }
    
// //     if (!password) {
// //       newErrors.password = "Password is required"
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters"
// //     }
    
// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
    
// //     if (!validateForm()) return
    
// //     setIsLoading(true)
    
// //     // Simulate API call
// //     setTimeout(() => {
// //       setIsLoading(false)
// //       onLogin() // Call the onLogin prop to update authentication state
// //     }, 1500)
// //   }

// //   const handleSocialLogin = (provider: string) => {
// //     console.log(`Login with ${provider}`)
// //     setIsLoading(true)
// //     setTimeout(() => {
// //       setIsLoading(false)
// //       onLogin() // Call the onLogin prop to update authentication state
// //     }, 1000)
// //   }

// //   // Floating WhatsApp Icons Animation
// //   const FloatingIcons = () => (
// //     <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
// //       {[...Array(12)].map((_, i) => (
// //         <div
// //           key={i}
// //           className="absolute animate-float opacity-5"
// //           style={{
// //             top: `${Math.random() * 100}%`,
// //             left: `${Math.random() * 100}%`,
// //             animationDelay: `${i * 1.5}s`,
// //             animationDuration: `${6 + Math.random() * 3}s`,
// //           }}
// //         >
// //           <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center">
// //             <ChatIcon className="w-2 h-2 sm:w-4 sm:h-4 text-white" />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   )

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative flex items-center justify-center p-3 sm:p-4">
// //       <FloatingIcons />
      
// //       {/* Main Container */}
// //       <div className="relative z-10 w-full max-w-md">
// //         {/* Logo Section */}
// //         <div className="text-center mb-6 sm:mb-8">
// //           <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
// //             <ChatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
// //           </div>
// //           <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back!</h1>
// //           <p className="text-white/80 text-sm sm:text-base">Sign in to your ReplyMate AI account</p>
// //         </div>

// //         {/* Login Form */}
// //         <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
// //           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
// //             {/* Email Field */}
// //             <div className="space-y-2">
// //               <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
// //                 <Email className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 Email Address
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="email"
// //                   placeholder="Enter your email"
// //                   value={email}
// //                   onChange={(e) => {
// //                     setEmail(e.target.value)
// //                     if (errors.email) setErrors({ ...errors, email: undefined })
// //                   }}
// //                   className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
// //                     errors.email 
// //                       ? "border-red-300 focus:border-red-500" 
// //                       : "border-gray-200 focus:border-[#25D366]"
// //                   }`}
// //                 />
// //               </div>
// //               {errors.email && (
// //                 <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
// //                   {errors.email}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Password Field */}
// //             <div className="space-y-2">
// //               <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
// //                 <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   placeholder="Enter your password"
// //                   value={password}
// //                   onChange={(e) => {
// //                     setPassword(e.target.value)
// //                     if (errors.password) setErrors({ ...errors, password: undefined })
// //                   }}
// //                   className={`w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 sm:pr-14 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
// //                     errors.password 
// //                       ? "border-red-300 focus:border-red-500" 
// //                       : "border-gray-200 focus:border-[#25D366]"
// //                   }`}
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
// //                 >
// //                   {showPassword ? (
// //                     <VisibilityOff className="w-5 h-5 sm:w-6 sm:h-6" />
// //                   ) : (
// //                     <Visibility className="w-5 h-5 sm:w-6 sm:h-6" />
// //                   )}
// //                 </button>
// //               </div>
// //               {errors.password && (
// //                 <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
// //                   {errors.password}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Forgot Password */}
// //             <div className="text-right">
// //               <button
// //                 type="button"
// //                 className="text-[#25D366] hover:text-[#128C7E] text-xs sm:text-sm font-medium touch-manipulation"
// //               >
// //                 Forgot Password?
// //               </button>
// //             </div>

// //             {/* Login Button */}
// //             <button
// //               type="submit"
// //               disabled={isLoading}
// //               className="w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2 touch-manipulation"
// //             >
// //               {isLoading ? (
// //                 <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //               ) : (
// //                 <>
// //                   <Person className="w-4 h-4 sm:w-5 sm:h-5" />
// //                   Sign In
// //                   <ArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 </>
// //               )}
// //             </button>
// //           </form>

// //           {/* Divider */}
// //           <div className="flex items-center my-6 sm:my-8">
// //             <div className="flex-1 border-t border-gray-200"></div>
// //             <span className="px-4 text-gray-500 text-xs sm:text-sm">or continue with</span>
// //             <div className="flex-1 border-t border-gray-200"></div>
// //           </div>

// //           {/* Social Login */}
// //           <div className="grid grid-cols-2 gap-3 sm:gap-4">
// //             <button
// //               onClick={() => handleSocialLogin("Google")}
// //               disabled={isLoading}
// //               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
// //             >
// //               <Google className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
// //               <span className="hidden sm:inline">Google</span>
// //             </button>
// //             <button
// //               onClick={() => handleSocialLogin("Facebook")}
// //               disabled={isLoading}
// //               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
// //             >
// //               <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
// //               <span className="hidden sm:inline">Facebook</span>
// //             </button>
// //           </div>

// //           {/* Sign Up Link */}
// //           <div className="text-center mt-6 sm:mt-8 pt-6 border-t border-gray-100">
// //             <p className="text-gray-600 text-xs sm:text-sm">
// //               Don't have an account?{" "}
// //               <button
// //                 onClick={() => onNavigate("signup")}
// //                 className="text-[#25D366] hover:text-[#128C7E] font-semibold touch-manipulation"
// //               >
// //                 Sign up for free
// //               </button>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Trust Indicators */}
// //         <div className="text-center mt-6 sm:mt-8">
// //           <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
// //             <CheckCircle className="w-4 h-4 text-[#25D366]" />
// //             <span>Trusted by 10,000+ businesses worldwide</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Login




// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Chat as ChatIcon,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
//   Google,
//   Facebook,
//   ArrowForward,
//   CheckCircle,
//   Person,
// } from "@mui/icons-material"

// interface LoginProps {
//   onNavigate: (page: "login" | "signup" | "dashboard" | "kb-editor") => void
//   onLogin: () => void
// }

// const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

//   const validateForm = () => {
//     const newErrors: { email?: string; password?: string } = {}
    
//     if (!email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Please enter a valid email"
//     }
    
//     if (!password) {
//       newErrors.password = "Password is required"
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault()
    
//   //   if (!validateForm()) return
    
//   //   setIsLoading(true)
    
//   //   // Simulate API call
//   //   setTimeout(() => {
//   //     setIsLoading(false)
//   //     onLogin() // Call the onLogin prop to update authentication state
//   //   }, 1500)
//   // }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     setIsLoading(true);
  
//     try {
//       // Auto-detect API base or use env override
//       const apiBase =
//         process.env.NEXT_PUBLIC_API_URL ||
//         `${window.location.protocol}//${window.location.host}`;
  
//       const response = await fetch(`${apiBase}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }
  
//       localStorage.setItem("token", data.token);
//       onLogin();
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };  

//   const handleSocialLogin = (provider: string) => {
//     console.log(`Login with ${provider}`)
//     setIsLoading(true)
//     setTimeout(() => {
//       setIsLoading(false)
//       onLogin() // Call the onLogin prop to update authentication state
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
//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo Section */}
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
//             <ChatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back!</h1>
//           <p className="text-white/80 text-sm sm:text-base">Sign in to your ReplyMate AI account</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
//                 <Email className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value)
//                     if (errors.email) setErrors({ ...errors, email: undefined })
//                   }}
//                   className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
//                     errors.email 
//                       ? "border-red-300 focus:border-red-500" 
//                       : "border-gray-200 focus:border-[#25D366]"
//                   }`}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
//                 <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value)
//                     if (errors.password) setErrors({ ...errors, password: undefined })
//                   }}
//                   className={`w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 sm:pr-14 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
//                     errors.password 
//                       ? "border-red-300 focus:border-red-500" 
//                       : "border-gray-200 focus:border-[#25D366]"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
//                 >
//                   {showPassword ? (
//                     <VisibilityOff className="w-5 h-5 sm:w-6 sm:h-6" />
//                   ) : (
//                     <Visibility className="w-5 h-5 sm:w-6 sm:h-6" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <button
//                 type="button"
//                 className="text-[#25D366] hover:text-[#128C7E] text-xs sm:text-sm font-medium touch-manipulation"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Login Button */}
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
//                   Sign In
//                   <ArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6 sm:my-8">
//             <div className="flex-1 border-t border-gray-200"></div>
//             <span className="px-4 text-gray-500 text-xs sm:text-sm">or continue with</span>
//             <div className="flex-1 border-t border-gray-200"></div>
//           </div>

//           {/* Social Login */}
//           <div className="grid grid-cols-2 gap-3 sm:gap-4">
//             <button
//               onClick={() => handleSocialLogin("Google")}
//               disabled={isLoading}
//               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
//             >
//               <Google className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//               <span className="hidden sm:inline">Google</span>
//             </button>
//             <button
//               onClick={() => handleSocialLogin("Facebook")}
//               disabled={isLoading}
//               className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
//             >
//               <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//               <span className="hidden sm:inline">Facebook</span>
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center mt-6 sm:mt-8 pt-6 border-t border-gray-100">
//             <p className="text-gray-600 text-xs sm:text-sm">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => onNavigate("signup")}
//                 className="text-[#25D366] hover:text-[#128C7E] font-semibold touch-manipulation"
//               >
//                 Sign up for free
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="text-center mt-6 sm:mt-8">
//           <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
//             <CheckCircle className="w-4 h-4 text-[#25D366]" />
//             <span>Trusted by 10,000+ businesses worldwide</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


"use client";

import React, { useState } from "react";
import {
  Chat as ChatIcon,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  ArrowForward,
  CheckCircle,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// interface LoginProps {
//   onNavigate: (page: "login" | "signup" | "dashboard" | "kb-editor") => void;
//   onLogin: () => void;
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Auto-detect API base or use environment variable
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      // Call the onLogin prop to update authentication state
      // onLogin();

      // Navigate to the dashboard
      navigate("/dashboard");
      // onNavigate("dashboard");
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // onLogin(); // Call the onLogin prop to update authentication state
      // onNavigate("dashboard");
      navigate("/dashboard")
    }, 1000);
  };

  const FloatingIcons = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${6 + Math.random() * 3}s`,
          }}
        >
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center">
            <ChatIcon className="w-2 h-2 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative flex items-center justify-center p-3 sm:p-4">
      <FloatingIcons />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
            <ChatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-white/80 text-sm sm:text-base">Sign in to your ReplyMate AI account</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {errors.general && (
              <p className="text-red-500 text-sm text-center">{errors.general}</p>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
                <Email className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 sm:pr-14 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
                    errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-[#25D366]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-manipulation"
                >
                  {showPassword ? (
                    <VisibilityOff className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Visibility className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-[#25D366] hover:text-[#128C7E] text-xs sm:text-sm font-medium touch-manipulation"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2 touch-manipulation"
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Person className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sign In
                  <ArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center my-6 sm:my-8">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-xs sm:text-sm">or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
            >
              <Google className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm sm:text-base font-medium touch-manipulation"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          <div className="text-center mt-6 sm:mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-xs sm:text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#25D366] hover:text-[#128C7E] font-semibold touch-manipulation"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
            <CheckCircle className="w-4 h-4 text-[#25D366]" />
            <span>Trusted by 10,000+ businesses worldwide</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login