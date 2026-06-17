"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase, type Review } from "@/lib/supabase";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TrustSection() {
  const [stats, setStats] = useState({
    completedTrades: 247,
    totalCustomers: 189,
    avgRating: 4.9,
    successRate: 99.2,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: reviewCount } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true });

      const { data: avgData } = await supabase
        .from("reviews")
        .select("rating");

      const { count: customerCount } = await supabase
        .from("purchases")
        .select("*", { count: "exact", head: true })
        .eq("status", "paid");

      if (reviewCount && customerCount) {
        const avg = avgData && avgData.length > 0
          ? avgData.reduce((sum, r) => sum + r.rating, 0) / avgData.length
          : 4.9;
        setStats({
          completedTrades: reviewCount || 247,
          totalCustomers: customerCount || 189,
          avgRating: Math.round(avg * 10) / 10 || 4.9,
          successRate: 99.2,
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="trust" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built on Trust
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Numbers don&apos;t lie. Here&apos;s what our track record looks like.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Completed Trades",
              value: stats.completedTrades,
              suffix: "+",
            },
            {
              label: "Total Customers",
              value: stats.totalCustomers,
              suffix: "+",
            },
            {
              label: "Average Rating",
              value: stats.avgRating,
              suffix: "/5",
              isDecimal: true,
            },
            {
              label: "Success Rate",
              value: stats.successRate,
              suffix: "%",
              isDecimal: true,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {stat.isDecimal ? (
                    <AnimatedCounter target={Math.round(stat.value * 10)} />
                  ) : (
                    <AnimatedCounter target={stat.value} />
                  )}
                  {stat.suffix}
                </div>
                <div className="text-sm text-white/30">{stat.label}</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
