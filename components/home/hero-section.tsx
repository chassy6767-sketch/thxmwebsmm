"use client";

import { motion } from "framer-motion";
import { MorphingShape, GradientOrb } from "./morphing-shapes";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/supabase-provider";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <MorphingShape
        className="-top-40 -left-40"
        color="rgba(255,255,255,0.02)"
        size={600}
      />
      <MorphingShape
        className="bottom-0 right-0"
        color="rgba(255,255,255,0.015)"
        size={500}
        delay={2}
      />
      <GradientOrb
        className="top-1/4 left-1/4 w-[300px] h-[300px]"
        colors={["rgba(40,40,40,0.5)", "rgba(20,20,20,0.3)", "transparent"]}
      />
      <GradientOrb
        className="bottom-1/4 right-1/4 w-[400px] h-[400px]"
        colors={["rgba(30,30,30,0.4)", "rgba(15,15,15,0.2)", "transparent"]}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Floating dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/[0.04]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
          }}
          animate={{
            y: [0, -20 - Math.random() * 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Shield className="w-3.5 h-3.5 text-white/60" />
            <span className="text-xs text-white/60 font-medium tracking-wide uppercase">
              Verified & Trusted
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The Most Trusted
          <br />
          <span className="gradient-text">Middleman.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Secure your deal with THXM. Fast, trusted, and backed by real
          customer reviews.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={user ? "/dashboard" : "/auth/register"}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
          >
            Hire THXM for &euro;10
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-xs">iDEAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-xs">Bancontact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-xs">Apple Pay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-xs">Credit Card</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
