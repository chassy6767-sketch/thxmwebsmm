"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/supabase-provider";
import { MorphingShape } from "./morphing-shapes";

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="relative py-32 overflow-hidden">
      <MorphingShape
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        color="rgba(255,255,255,0.015)"
        size={500}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Shield className="w-10 h-10 text-white/20 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to Trade Safely?
          </h2>
          <p className="text-white/35 mb-10 max-w-lg mx-auto leading-relaxed">
            Join hundreds of verified customers who trust THXM for their online
            transactions. One flat fee. Zero risk.
          </p>
          <Link
            href={user ? "/dashboard" : "/auth/register"}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
          >
            Hire THXM for &euro;10
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
