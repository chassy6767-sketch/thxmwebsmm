"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: "",
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/auth/verify-email");
    }
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
            Create your account
          </h1>
          <p className="text-sm text-white/35">Start trading securely today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="Min. 6 characters"
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
            className="w-full bg-white text-black py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/25 mb-3">
            Already have an account?
          </p>
          <Link
            href="/auth/login"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>

        <Link
          href="/"
          className="mt-10 flex items-center justify-center gap-1.5 text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
