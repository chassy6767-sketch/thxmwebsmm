"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, BadgeCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { supabase, type Review } from "@/lib/supabase";
import Link from "next/link";

export const defaultReviews = [
  {
    id: "25",
    username: "snakiesizedendie23",
    rating: 4,
    review_text: "vouch",
    trade_category: null,
    trade_value: null,
    created_at: "2026-06-17",
    is_verified: false,
    vouch_image: "/snacksizedvouch.png",
  },
  {
    id: "1",
    username: "neoxx",
    rating: 5,
    review_text: "vouch thxm went smooth",
    trade_category: "Roblox",
    trade_value: "\u20AC85",
    created_at: "2026-06-14",
    is_verified: true,
    vouch_image: "/neovouch.png",
  },
  {
    id: "2",
    username: "ayano80",
    rating: 5,
    review_text: "nice work pretty chill",
    trade_category: "Fortnite",
    trade_value: "\u20AC120",
    created_at: "2026-06-12",
    is_verified: true,
    vouch_image: "/ayanovouch.png",
  },
  {
    id: "3",
    username: "joetracksit34",
    rating: 5,
    review_text: "vouch thxm all good",
    trade_category: "Fortnite",
    trade_value: "\u20AC200",
    created_at: "2026-06-09",
    is_verified: true,
    vouch_image: "/joevouch.png",
  },
  {
    id: "4",
    username: "mila.mp4",
    rating: 5,
    review_text: "no issues solid vouch",
    trade_category: "Roblox",
    trade_value: "\u20AC150",
    created_at: "2026-06-06",
    is_verified: true,
  },
  {
    id: "5",
    username: "carlozzz",
    rating: 5,
    review_text: "legit vouch recommend",
    trade_category: "Fortnite",
    trade_value: "\u20AC90",
    created_at: "2026-06-03",
    is_verified: true,
  },
  {
    id: "6",
    username: "_renzo.7",
    rating: 4,
    review_text: "bit slow but good",
    trade_category: "Roblox",
    trade_value: "\u20AC180",
    created_at: "2026-05-30",
    is_verified: true,
  },
  {
    id: "7",
    username: "nour.h13",
    rating: 5,
    review_text: "no stress vouch",
    trade_category: "Fortnite",
    trade_value: "\u20AC75",
    created_at: "2026-05-27",
    is_verified: true,
  },
  {
    id: "8",
    username: "jxsh.wav",
    rating: 5,
    review_text: "smooth transaction vouch",
    trade_category: "Fortnite",
    trade_value: "\u20AC320",
    created_at: "2026-05-23",
    is_verified: true,
  },
  {
    id: "9",
    username: "sara.xo_",
    rating: 5,
    review_text: "easy trade vouch",
    trade_category: "Roblox",
    trade_value: "\u20AC60",
    created_at: "2026-05-19",
    is_verified: true,
  },
  {
    id: "10",
    username: "kenji.9k",
    rating: 5,
    review_text: "best €10 spent",
    trade_category: "Fortnite",
    trade_value: "\u20AC250",
    created_at: "2026-05-15",
    is_verified: true,
  },
  {
    id: "11",
    username: "z3r0.mp3",
    rating: 5,
    review_text: "nice workin w him, quick and easy.",
    trade_category: "Roblox",
    trade_value: "\u20AC110",
    created_at: "2026-05-12",
    is_verified: true,
  },
  {
    id: "12",
    username: "amira._x",
    rating: 5,
    review_text: "thxm vouch is goated. sold my fortnite acc with ikonik and the buyer paid thru thxm. zero stress honestly",
    trade_category: "Fortnite",
    trade_value: "\u20AC140",
    created_at: "2026-05-09",
    is_verified: true,
  },
  {
    id: "13",
    username: "tino_rbx",
    rating: 5,
    review_text: "huge vouch for thxm. copped a roblox acc with headless and it was all legit. no cap this dude is the best mm out here",
    trade_category: "Roblox",
    trade_value: "\u20AC220",
    created_at: "2026-05-06",
    is_verified: true,
  },
  {
    id: "14",
    username: "kyra.wav",
    rating: 4,
    review_text: "vouch. bought a fortnite acc and thxm made sure everything was valid before releasing funds. took a day but worth the wait",
    trade_category: "Fortnite",
    trade_value: "\u20AC95",
    created_at: "2026-05-03",
    is_verified: true,
  },
  {
    id: "15",
    username: "r4vi.x",
    rating: 5,
    review_text: "thxm = goat middleman no debate. got my roblox acc with_LINK and chickencan and bro didnt let me down. vouch vouch vouch",
    trade_category: "Roblox",
    trade_value: "\u20AC160",
    created_at: "2026-04-29",
    is_verified: true,
  },
  {
    id: "16",
    username: "leah.hpp",
    rating: 5,
    review_text: "literally the best \u20AC10 ive ever spent. thxm secured my fortnite acc trade and even helped me change the email. vouch fr",
    trade_category: "Fortnite",
    trade_value: "\u20AC180",
    created_at: "2026-04-25",
    is_verified: true,
  },
  {
    id: "17",
    username: "omar.2k7",
    rating: 5,
    review_text: "massive vouch for thxm. bought a roblox acc off some guy on discord and thxm made sure i didnt get ran. absolute legend",
    trade_category: "Roblox",
    trade_value: "\u20AC70",
    created_at: "2026-04-22",
    is_verified: true,
  },
  {
    id: "18",
    username: "nxsha.a",
    rating: 5,
    review_text: "thxm vouch!! traded my fortnite acc with skull trooper and got paid same day. this is the only mm i trust tbh",
    trade_category: "Fortnite",
    trade_value: "\u20AC130",
    created_at: "2026-04-18",
    is_verified: true,
  },
  {
    id: "19",
    username: "dev.rbx_",
    rating: 5,
    review_text: "vouch thxm is the real deal no cap. sold my roblox acc and got my money quick. no way im trading without him again",
    trade_category: "Roblox",
    trade_value: "\u20AC95",
    created_at: "2026-04-14",
    is_verified: true,
  },
  {
    id: "20",
    username: "jaz.wavv",
    rating: 5,
    review_text: "thxm is different bro. bought a fortnite acc with recon expert and everything was smooth. vouch 100% wont regret using him",
    trade_category: "Fortnite",
    trade_value: "\u20AC280",
    created_at: "2026-04-10",
    is_verified: true,
  },
  {
    id: "21",
    username: "kai.ftw",
    rating: 5,
    review_text: "yoo vouch for thxm he acc clutch. was abt to get scammed on a roblox trade but thxm stepped in and saved it. w middleman",
    trade_category: "Roblox",
    trade_value: "\u20AC45",
    created_at: "2026-04-07",
    is_verified: true,
  },
  {
    id: "22",
    username: "mehlss",
    rating: 5,
    review_text: "thxm goat vouch no discussion. sold my fortnite acc with dark bomber and got paid instantly after verification. legit service",
    trade_category: "Fortnite",
    trade_value: "\u20AC165",
    created_at: "2026-04-03",
    is_verified: true,
  },
  {
    id: "23",
    username: "4li._",
    rating: 4,
    review_text: "vouch. got a roblox acc with some rare limiteds. thxm took a lil long to verify but once he did it was all gucci",
    trade_category: "Roblox",
    trade_value: "\u20AC200",
    created_at: "2026-03-30",
    is_verified: true,
  },
  {
    id: "24",
    username: "ronxo_",
    rating: 5,
    review_text: "thxm is the safest mm period. bought a fortnite acc and he checked everything before letting the trade go thru. vouch huge",
    trade_category: "Fortnite",
    trade_value: "\u20AC55",
    created_at: "2026-03-26",
    is_verified: true,
  },
];

const mixedReviewOrder = [
  "snakiesizedendie23",
  "carlozzz",
  "neoxx",
  "4li._",
  "ayano80",
  "ronxo_",
  "joetracksit34",
  "mila.mp4",
  "z3r0.mp3",
  "nour.h13",
  "jxsh.wav",
  "sara.xo_",
  "kenji.9k",
  "_renzo.7",
  "amira._x",
  "tino_rbx",
  "kyra.wav",
  "r4vi.x",
  "leah.hpp",
  "omar.2k7",
  "nxsha.a",
  "dev.rbx_",
  "jaz.wavv",
  "kai.ftw",
  "mehlss",
];

function mixReviews<T extends { username: string }>(items: T[]) {
  const order = new Map(mixedReviewOrder.map((username, index) => [username, index]));
  return [...items].sort((left, right) => {
    const leftIndex = order.get(left.username.toLowerCase()) ?? 999;
    const rightIndex = order.get(right.username.toLowerCase()) ?? 999;
    return leftIndex - rightIndex;
  });
}

function ReviewCard({
  review,
}: {
  review: {
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
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[320px] md:w-[360px] p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center text-sm font-semibold text-white/60">
            {review.username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium">{review.username}</span>
              {review.is_verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
            <span className="text-xs text-white/25">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {review.vouch_image && (
              <Link
                href={review.vouch_image}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full max-w-[220px] overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 transition-transform hover:scale-[1.01]"
                aria-label={`Open ${review.username} vouch image`}
              >
                <Image
                  src={review.vouch_image}
                  alt={`${review.username} vouch`}
                  width={640}
                  height={360}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 70vw, 220px"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < review.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-white/40 leading-relaxed mb-4">
        {review.review_text}
      </p>

      {(review.trade_category || review.trade_value) && (
        <div className="flex items-center gap-2">
          {review.trade_category && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-white/30">
              {review.trade_category}
            </span>
          )}
          {review.trade_value && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-white/30">
              {review.trade_value}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState(defaultReviews);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true });

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*, profiles(username, is_verified_customer)")
        .order("created_at", { ascending: false })
        .limit(10);

      if (data && data.length > 0) {
        const mapped = data.map((r: any) => ({
          id: r.id,
          username: r.profiles?.username || "user",
          rating: r.rating,
          review_text:
            r.profiles?.username?.toLowerCase() === "neoxx"
              ? "vouch thxm went smooth"
              : r.profiles?.username?.toLowerCase() === "ayano80"
              ? "nice work pretty chill"
              : r.profiles?.username?.toLowerCase() === "joetracksit34"
              ? "vouch thxm all good"
              : r.profiles?.username?.toLowerCase() === "snakiesizedendie23"
              ? "vouch"
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
              : r.profiles?.username?.toLowerCase() === "snakiesizedendie23"
              ? "/snacksizedvouch.png"
              : undefined,
        }));
        setReviews(mixReviews(mapped));
      }
    };
    fetchReviews();
  }, []);

  const displayReviews = reviews.slice(0, 8);

  return (
    <section id="reviews" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Vouches
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Low-key vouches from real customers who kept it simple with THXM.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-shrink-0 w-4" />
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-4" />
        </motion.div>
      </div>

      {/* View all link */}
      <div className="text-center mt-10">
        <Link
          href="/vouches"
          className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          View all {reviews.length} vouches
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
