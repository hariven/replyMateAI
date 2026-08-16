"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, CheckCircle, ArrowLeft } from "@mui/icons-material";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();
  const tokenValue = token || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Validate token on mount
  useEffect(() => {
    if (!tokenValue) {
      navigate("/forgot-password");
      return;
    }

    const validateToken = async () => {
      setIsCheckingToken(true);
      try {
        const API_BASE =
          import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
            ? import.meta.env.VITE_API_URL
            : "/api";

        const response = await fetch(`${API_BASE}/reset-password/${tokenValue}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          setErrors({ general: "Invalid or expired token" });
        }
      } catch (err: any) {
        setIsValidToken(false);
        setErrors({ general: "Failed to validate token" });
      } finally {
        setIsCheckingToken(false);
      }
    };

    validateToken();
  }, [tokenValue, navigate]);

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    setSuccess(null);

    const API_BASE =
      import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
        ? import.meta.env.VITE_API_URL
        : "/api";

    try {
      const response = await fetch(`${API_BASE}/reset-password/${tokenValue}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess("Your password has been reset successfully! You can now log in.");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  // If token is invalid, redirect to forgot password page
  if (!isValidToken && !isCheckingToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-start mb-4">
            <button onClick={() => navigate("/forgot-password")} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft /> Back
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-center h-16 w-16 bg-red-100 rounded-xl">
              <Lock className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Invalid or Expired Token</h2>
            <p className="text-gray-600">
              The password reset link has expired or is invalid. Please request a new one.
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] relative flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%200v60M0%2036h60M6.364%206.364l47.272%2047.272M12.727%2012.727l34.546%2034.546M19.091%2019.091l21.818%2021.818M25.455%2025.455l9.091%209.091Z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"/>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-2xl mb-4 sm:mb-6">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 to-[transparent] pointer-events-none rounded-full animate-pulse-slow"></div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
          {isCheckingToken && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
              <p className="ml-3 text-gray-600">Validating reset link...</p>
            </div>
          )}

          {!isCheckingToken && (
            <>
              {success && (
                <p className="text-green-500 text-sm text-center mb-4">
                  {success}
                </p>
              )}

              {errors.general && (
                <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#25D366]"
                      }`}
                      minLength={8}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#25D366]/10 to-[transparent] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#075E54]">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      className={`w-full px-4 py-3 sm:px-6 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#25D366]/20 outline-none transition-all text-sm sm:text-base touch-manipulation ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-[#25D366]"
                      }`}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#25D366]/10 to-[transparent] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative overflow-hidden w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#128C7E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-lg flex items-center justify-center gap-2 touch-manipulation"
                >
                  <span className="relative z-10 flex items-center">
                    {isLoading ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Reset Password
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/20 to-[transparent] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>

              <div className="text-center mt-6 sm:mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Remember your password?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[#25D366] hover:text-[#128C7E] font-semibold touch-manipulation"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;