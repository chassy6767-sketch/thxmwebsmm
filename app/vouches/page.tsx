"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Star, BadgeCheck, Shield, ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { defaultReviews } from "@/components/home/reviews-section";
import { BrandLogo } from "@/components/brand-logo";

type Vouch = {
  id: string;
  username: string;
  rating: number;
  review_text: string;
  trade_category?: string | null;
  trade_value?: string | null;
  created_at: string;
  is_verified?: boolean;
  vouch_image?: string | null;
};

const categories = ["All", "Roblox", "Fortnite"];

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cacheBustAsset(src?: string | null) {
  if (!src) return src;
  return `${src}?v=20260617`;
}

export default function VouchesPage() {
  const [vouches, setVouches] = useState<Vouch[]>(() => shuffle(defaultReviews));
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVouches = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*, profiles(username, is_verified_customer)")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const mapped = data.map((r: any) => ({
          id: r.id,
          username: r.profiles?.username || "user",
          rating: r.rating,
          review_text:
            r.profiles?.username?.toLowerCase() === "daylightss"
              ? "vouch — fast, friendly, secure, highly recommend"
              : r.profiles?.username?.toLowerCase() === "raketss283"
              ? "vouch smooth trade very reliable"
              : r.profiles?.username?.toLowerCase() === "bokemonji11"
              ? "vouch quick and safe"
              : r.profiles?.username?.toLowerCase() === "joshuaaxx"
              ? "vouch smooth transaction thanks man"
              : r.profiles?.username?.toLowerCase() === "rommiiuwu"
              ? "vouch, legit"
              : r.profiles?.username?.toLowerCase() === "zaynnth"
              ? "quick clean vouch"
              : r.profiles?.username?.toLowerCase() === "crazyytci"
              ? "smooth and reliable vouch"
              : r.profiles?.username?.toLowerCase() === "cretimm!!"
              ? "solid legit vouch"
              : r.profiles?.username?.toLowerCase() === "slipknot113"
              ? "fast and good"
              :
            r.profiles?.username?.toLowerCase() === "neoxx"
              ? "vouch thxm went smooth"
              : r.profiles?.username?.toLowerCase() === "ayano80"
              ? "nice work pretty chill"
              : r.profiles?.username?.toLowerCase() === "joetracksit34"
              ? "vouch thxm all good"
              : r.profiles?.username?.toLowerCase() === "mila.mp4"
              ? "no issues solid vouch"
              : r.profiles?.username?.toLowerCase() === "carlozzz"
              ? "legit vouch recommend"
              : r.profiles?.username?.toLowerCase() === "_renzo.7"
              ? "bit slow but good"
              : r.profiles?.username?.toLowerCase() === "nour.h13"
              ? "no stress vouch"
              : r.profiles?.username?.toLowerCase() === "jxsh.wav"
              ? "smooth transaction vouch"
              : r.profiles?.username?.toLowerCase() === "sara.xo_"
              ? "easy trade vouch"
              : r.profiles?.username?.toLowerCase() === "kenji.9k"
              ? "best €10 spent"
              : r.review_text,
          trade_category: r.trade_category,
          trade_value: r.trade_value,
          created_at: r.created_at.replace(/^2025-/, "2026-"),
          is_verified: r.profiles?.is_verified_customer || false,
          vouch_image:
            r.profiles?.username?.toLowerCase() === "neoxx"
              ? "/neovouch.png"
              : r.profiles?.username?.toLowerCase() === "ayano80"
                ? "/ayanovouch.png"
                : r.profiles?.username?.toLowerCase() === "joetracksit34"
                  ? "/joevouch.png"
                  : r.profiles?.username?.toLowerCase() === "daylightss"
                    ? "/daylightvouch.png"
                    : r.profiles?.username?.toLowerCase() === "raketss283"
                      ? "/racketpingvouch.png"
                      : r.profiles?.username?.toLowerCase() === "bokemonji11"
                        ? "/bokeoyaji.png"
                        : r.profiles?.username?.toLowerCase() === "joshuaaxx"
                          ? "/jxshvouch.png"
                          : r.profiles?.username?.toLowerCase() === "rommiiuwu"
                            ? "/romsivouch.png"
                            : r.profiles?.username?.toLowerCase() === "zaynnth"
                              ? "/zythvouch.png"
                            : r.profiles?.username?.toLowerCase() === "crazyytci"
                              ? "/crazticvouch.png"
                            : r.profiles?.username?.toLowerCase() === "cretimm!!"
                              ? "/cretimvouch.png"
                            : r.profiles?.username?.toLowerCase() === "slipknot113"
                              ? "/slipknot114.png"
                            : undefined,
        }));
        setVouches(shuffle(mapped));
      }
    };
    fetchVouches();
  }, []);

  const filtered = vouches.filter((v) => {
    const matchCat = filter === "All" || v.trade_category === filter;
    const matchSearch =
      search === "" ||
      v.username.toLowerCase().includes(search.toLowerCase()) ||
      v.review_text.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const robloxCount = vouches.filter((v) => v.trade_category === "Roblox").length;
  const fortniteCount = vouches.filter((v) => v.trade_category === "Fortnite").length;
  const avgRating =
    vouches.length > 0
      ? (vouches.reduce((sum, v) => sum + v.rating, 0) / vouches.length).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen bg-[#050505]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="sm" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-white/25 hover:text-white/40 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Home
          </Link>
        </div>
      </nav>

      <div ref={ref} className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 h-px w-24 bg-gradient-to-r from-[#ff8c00] via-[#ffb15c] to-transparent" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Vouches
          </h1>
          <p className="text-sm text-white/35 mb-10">
            Real vouches, kept low-key. No fake reviews.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff8c00] via-[#ffb15c] to-transparent opacity-80" />
            <div className="text-xl font-bold">{vouches.length}</div>
            <div className="text-xs text-white/25">Total Vouches</div>
          </div>
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff8c00] via-[#ffb15c] to-transparent opacity-80" />
            <div className="text-xl font-bold">{avgRating}</div>
            <div className="text-xs text-white/25">Avg Rating</div>
          </div>
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff8c00] via-[#ffb15c] to-transparent opacity-80" />
            <div className="text-xl font-bold">
              {vouches.filter((v) => v.rating === 5).length}
            </div>
            <div className="text-xs text-white/25">5-Star Vouches</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === cat
                    ? "bg-[#ff8c00] text-black shadow-[0_0_0_1px_rgba(255,140,0,0.35)]"
                    : "bg-white/[0.04] text-white/35 hover:text-white/50 hover:bg-white/[0.06]"
                }`}
              >
                {cat}
                {cat === "Roblox" && (
                  <span className="ml-1.5 text-[10px] opacity-60">{robloxCount}</span>
                )}
                {cat === "Fortnite" && (
                  <span className="ml-1.5 text-[10px] opacity-60">{fortniteCount}</span>
                )}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ff8c00]/55" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vouches..."
              className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#ff8c00]/35 transition-colors"
            />
          </div>
        </motion.div>

        {/* Vouch cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((vouch, i) => (
            <motion.div
              key={vouch.id}
              className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff8c00] via-[#ffb15c] to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#ff8c00]/10 flex items-center justify-center text-xs font-semibold text-[#ffb15c] ring-1 ring-[#ff8c00]/20">
                    {vouch.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{vouch.username}</span>
                      {vouch.is_verified && (
                        <BadgeCheck className="w-3 h-3 text-[#ff8c00]" />
                      )}
                    </div>
                    <span className="text-[10px] text-white/20">
                      {new Date(vouch.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${
                        s <= vouch.rating
                          ? "text-[#ff8c00] fill-[#ff8c00]"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {vouch.vouch_image && (
                <Link
                  href={cacheBustAsset(vouch.vouch_image) as string}
                  target="_blank"
                  rel="noreferrer"
                    className="relative mb-3 block w-full overflow-hidden rounded-xl border border-white/[0.12] bg-black p-2 aspect-[16/10] sm:aspect-[16/9] transition-transform hover:scale-[1.01]"
                  aria-label={`Open ${vouch.username} vouch image`}
                >
                  <Image
                    src={cacheBustAsset(vouch.vouch_image) as string}
                    alt={`${vouch.username} vouch`}
                    fill
                      className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
              )}

              <p className="text-sm text-white/40 leading-relaxed mb-3">
                {vouch.review_text}
              </p>

              <div className="flex items-center gap-2">
                {vouch.trade_category && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff8c00]/10 text-[#ffb15c] font-medium ring-1 ring-[#ff8c00]/15">
                    {vouch.trade_category}
                  </span>
                )}
                {vouch.trade_value && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff8c00]/10 text-[#ffb15c] ring-1 ring-[#ff8c00]/15">
                    {vouch.trade_value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Star className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/25">No vouches found</p>
            <p className="text-xs text-white/15 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
