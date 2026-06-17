"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/supabase-provider";
import { supabase, type Purchase, type Review, type Profile } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Shield,
  CreditCard,
  Star,
  Settings,
  BadgeCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [reviews, setReviews] = useState<(Review & { profiles?: Profile })[]>([]);
  const [activeTab, setActiveTab] = useState<"purchases" | "reviews" | "settings">("purchases");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewCategory, setReviewCategory] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [selectedPurchaseId, setSelectedPurchaseId] = useState("");
  const [availablePurchases, setAvailablePurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: purchaseData } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (purchaseData) setPurchases(purchaseData as Purchase[]);

      const { data: reviewData } = await supabase
        .from("reviews")
        .select("*, profiles(username, is_verified_customer)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (reviewData) setReviews(reviewData as any);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user || !showReviewForm) return;
    const fetchAvailable = async () => {
      const { data: reviewData } = await supabase
        .from("reviews")
        .select("purchase_id")
        .eq("user_id", user.id);
      const reviewedIds = new Set(reviewData?.map((r: any) => r.purchase_id));

      const available = purchases.filter(
        (p) => p.status === "paid" && !reviewedIds.has(p.id)
      );
      setAvailablePurchases(available);
      if (available.length > 0) setSelectedPurchaseId(available[0].id);
    };
    fetchAvailable();
  }, [user, showReviewForm, purchases]);

  const handlePurchase = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (!accessToken) return;

    try {
      const res = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPurchaseId || !reviewText) return;

    const { error } = await supabase.from("reviews").insert({
      user_id: user!.id,
      purchase_id: selectedPurchaseId,
      rating: reviewRating,
      review_text: reviewText,
      trade_category: reviewCategory || null,
      trade_value: reviewValue || null,
    });

    if (!error) {
      setShowReviewForm(false);
      setReviewText("");
      setReviewRating(5);
      setReviewCategory("");
      setReviewValue("");
      const { data: reviewData } = await supabase
        .from("reviews")
        .select("*, profiles(username, is_verified_customer)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (reviewData) setReviews(reviewData as any);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const statusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-white/20" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-white/40" />
            <span className="text-sm font-medium text-white/40">THXM</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">{profile?.username}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-white/20 hover:text-white/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            {profile?.is_verified_customer && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <BadgeCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-medium">
                  Verified
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-white/30 mb-8">
            Manage your purchases, reviews, and account.
          </p>
        </motion.div>

        {/* Quick Action */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={handlePurchase}
            className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-95"
          >
            <CreditCard className="w-4 h-4" />
            Hire THXM for &euro;10
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/[0.06]">
          {[
            { id: "purchases" as const, label: "Purchases", icon: CreditCard },
            { id: "reviews" as const, label: "Reviews", icon: Star },
            { id: "settings" as const, label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-white border-white"
                  : "text-white/30 border-transparent hover:text-white/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "purchases" && (
            <div className="space-y-3">
              {purchases.length === 0 ? (
                <div className="text-center py-16">
                  <CreditCard className="w-8 h-8 text-white/10 mx-auto mb-3" />
                  <p className="text-sm text-white/25">No purchases yet</p>
                  <p className="text-xs text-white/15 mt-1">
                    Click the button above to hire THXM
                  </p>
                </div>
              ) : (
                purchases.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {statusIcon(p.status)}
                      <div>
                        <p className="text-sm font-medium">
                          THXM Middleman Service
                        </p>
                        <p className="text-xs text-white/25">
                          {new Date(p.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          {p.payment_method && ` via ${p.payment_method}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          p.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : p.status === "pending"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {p.status}
                      </span>
                      <span className="text-sm font-medium">
                        &euro;{(p.amount_cents / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {profile?.is_verified_customer && (
                <div className="mb-6">
                  {!showReviewForm ? (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Write a Review
                    </button>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmitReview}
                      className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <h3 className="text-sm font-semibold">Write a Review</h3>

                      {availablePurchases.length === 0 ? (
                        <p className="text-xs text-white/30">
                          No eligible purchases to review. You can only review
                          paid purchases that haven&apos;t been reviewed yet.
                        </p>
                      ) : (
                        <>
                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">
                              Select Purchase
                            </label>
                            <select
                              value={selectedPurchaseId}
                              onChange={(e) =>
                                setSelectedPurchaseId(e.target.value)
                              }
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-white/20"
                            >
                              {availablePurchases.map((p) => (
                                <option key={p.id} value={p.id}>
                                  Purchase from{" "}
                                  {new Date(
                                    p.created_at
                                  ).toLocaleDateString()}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">
                              Rating
                            </label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewRating(star)}
                                  className="p-1"
                                >
                                  <Star
                                    className={`w-6 h-6 transition-colors ${
                                      star <= reviewRating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-white/15"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">
                              Review
                            </label>
                            <textarea
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              required
                              rows={3}
                              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
                              placeholder="Share your experience..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-white/40 mb-1.5 block">
                                Trade Category
                              </label>
                              <input
                                value={reviewCategory}
                                onChange={(e) =>
                                  setReviewCategory(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                                placeholder="e.g. Sneakers"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-white/40 mb-1.5 block">
                                Trade Value
                              </label>
                              <input
                                value={reviewValue}
                                onChange={(e) =>
                                  setReviewValue(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                                placeholder="e.g. €350"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="submit"
                              className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all"
                            >
                              Submit Review
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="text-sm text-white/30 hover:text-white/50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </motion.form>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <div className="text-center py-16">
                    <Star className="w-8 h-8 text-white/10 mx-auto mb-3" />
                    <p className="text-sm text-white/25">No reviews yet</p>
                    {!profile?.is_verified_customer && (
                      <p className="text-xs text-white/15 mt-1">
                        Purchase THXM to unlock review submission
                      </p>
                    )}
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= r.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-white/10"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-white/20">
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed mb-2">
                        {r.review_text}
                      </p>
                      <div className="flex items-center gap-2">
                        {r.trade_category && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-white/25">
                            {r.trade_category}
                          </span>
                        )}
                        {r.trade_value && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-white/25">
                            {r.trade_value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-sm font-semibold mb-4">Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Username</span>
                    <span className="text-sm">{profile?.username}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Email</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Status</span>
                    <span className="text-sm flex items-center gap-1.5">
                      {profile?.is_verified_customer ? (
                        <>
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Verified Customer
                        </>
                      ) : (
                        "Standard"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Member Since</span>
                    <span className="text-sm">
                      {new Date(
                        profile?.created_at || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-sm font-semibold mb-4">Security</h3>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Change Password
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
