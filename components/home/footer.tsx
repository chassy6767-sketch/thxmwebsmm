"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/vouches" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Vouches
            </Link>
            <Link href="#how-it-works" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              How It Works
            </Link>
            <Link href="#trust" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Trust
            </Link>
          </div>
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} THXM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
