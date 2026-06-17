"use client";

import { Navbar } from "@/components/home/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { TrustSection } from "@/components/home/trust-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
