"use client";

import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/supabase-provider";
import { supabase } from "@/lib/supabase";
import { BrandLogo } from "@/components/brand-logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <BrandLogo size="md" className="transition-transform group-hover:scale-[1.02]" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/vouches"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Vouches
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#trust"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Trust
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                {profile?.username || "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="text-sm bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4"
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/vouches"
              className="text-sm text-white/60 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Vouches
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-white/60 py-2"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#trust"
              className="text-sm text-white/60 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Trust
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm text-white/70 py-2">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm text-white/40 py-2 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-white/70 py-2">
                  Sign In
                </Link>
                <Link href="/auth/register" className="text-sm bg-white text-black px-5 py-2 rounded-full font-medium text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
