import React from "react";
import { Check, Crown, Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const Membership = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-[#050505]">
      {/* --- Background Dynamic Effects --- */}
      {/* Moving Red Spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[200px]" />

      {/* Noise Texture for Cinematic Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* --- LEFT SIDE: The Pitch --- */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]"
            >
              <Zap size={14} className="fill-current" /> Limited Edition
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight"
            >
              Become a <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-red-400 to-orange-500">
                Legend.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 max-w-md leading-relaxed"
            >
              Stop watching from the sidelines. Get the ultimate toolkit for
              cinephiles. Unlimited access, 4K data, and exclusive badges.
            </motion.p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              {[
                { text: "Unlimited Watchlists & Collections", icon: Check },
                { text: "4K & HDR Availability Data", icon: Star },
                { text: "Ad-Free Experience", icon: Zap },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <span className="text-white font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button Mobile Only (Desktop has card button) */}
            <div className="lg:hidden pt-6">
              <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/40">
                Get Pro Access
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: The 3D VIP Card (The "Different" Part) --- */}
          <div className="relative perspective-1000">
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md mx-auto aspect-4/5 md:aspect-3/4 rounded-[2.5rem] bg-linear-to-br from-gray-900 to-black border border-white/10 shadow-2xl overflow-hidden group"
            >
              {/* --- Card Internal Glows --- */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-[80px] group-hover:bg-primary/50 transition-all duration-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

              {/* --- Card Content --- */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <Crown className="w-12 h-12 text-white/20" />
                  <div className="text-right">
                    <span className="block text-white/40 text-xs font-bold tracking-[0.3em] uppercase">
                      Status
                    </span>
                    <span className="block text-white font-bold tracking-widest uppercase text-sm mt-1">
                      V.I.P Member
                    </span>
                  </div>
                </div>

                {/* Middle (Price) */}
                <div className="text-center space-y-2">
                  <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-6xl font-black text-white tracking-tighter">
                    $9<span className="text-2xl text-white/50">.99</span>
                  </h3>
                  <p className="text-white/40 text-sm font-medium">
                    Per Month • Cancel Anytime
                  </p>
                </div>

                {/* Bottom Row (Action) */}
                <div className="space-y-4">
                  <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
                  <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                    Activate Pass <Zap size={20} className="fill-black" />
                  </button>
                  <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
                    Secure Encrypted Payment
                  </p>
                </div>
              </div>

              {/* Holographic Shine Effect on Hover */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </motion.div>

            {/* Decorative Elements behind Card */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-dashed border-white/5 rounded-[2.5rem] hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
