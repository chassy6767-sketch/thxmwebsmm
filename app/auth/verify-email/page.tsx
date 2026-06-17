"use client";

import { motion } from "framer-motion";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm text-center"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Shield className="w-6 h-6 text-white/60" />
          <span className="text-sm font-medium text-white/60">THXM</span>
        </Link>

        <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-white/40" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-3">
          Check your email
        </h1>
        <p className="text-sm text-white/35 leading-relaxed mb-8">
          We&apos;ve sent you a verification link. Please check your email and
          click the link to verify your account.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all"
        >
          Continue to Sign In
        </Link>

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
