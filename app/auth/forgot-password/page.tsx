"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Shield className="w-6 h-6 text-white/60" />
            <span className="text-sm font-medium text-white/60">THXM</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Reset password
          </h1>
          <p className="text-sm text-white/35">
            We&apos;ll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-white/40" />
            </div>
            <p className="text-sm text-white/35 mb-6">
              Check your email for a password reset link.
            </p>
            <Link
              href="/auth/login"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400/80 bg-red-400/[0.08] px-4 py-2.5 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <Link
          href="/auth/login"
          className="mt-10 flex items-center justify-center gap-1.5 text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
