"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, Mail, Handshake, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up in seconds. Your profile is secure and private.",
  },
  {
    icon: CreditCard,
    title: "Purchase THXM for \u20AC10",
    description: "Pay securely via iDEAL, Bancontact, Apple Pay, or Credit Card.",
  },
  {
    icon: Mail,
    title: "Receive Confirmation",
    description: "Get instant booking confirmation and verified customer status.",
  },
  {
    icon: Handshake,
    title: "Complete Your Trade",
    description: "THXM secures both sides of the deal. Zero risk.",
  },
  {
    icon: Star,
    title: "Leave a Review",
    description: "Share your experience. Only verified customers can review.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Five simple steps to a secure transaction.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Left side */}
                <div className={`${i % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"} text-left`}>
                  <div className="flex items-center gap-3 md:justify-end mb-2">
                    {i % 2 !== 0 && (
                      <>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <span className="text-xs text-white/20 font-mono">
                          0{i + 1}
                        </span>
                      </>
                    )}
                    {i % 2 === 0 && (
                      <>
                        <span className="text-xs text-white/20 font-mono">
                          0{i + 1}
                        </span>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-white/35 leading-relaxed max-w-sm md:ml-auto">
                    {step.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <motion.div
                    className="w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0a] flex items-center justify-center"
                    whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    <step.icon className="w-4 h-4 text-white/60" />
                  </motion.div>
                </div>

                {/* Right side (spacer for alternating layout) */}
                <div className={`${i % 2 === 0 ? "md:order-2" : ""}`}>
                  {/* Mobile icon */}
                  <div className="md:hidden flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-[#0a0a0a] flex items-center justify-center">
                      <step.icon className="w-3.5 h-3.5 text-white/60" />
                    </div>
                    <span className="text-xs text-white/20 font-mono">0{i + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
