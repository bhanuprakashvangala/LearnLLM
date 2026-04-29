"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWithMockupProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Primary visual — rendered as the main "floating card" */
  primary: React.ReactNode;
  /** Optional secondary visual rendered as a subtle offset card behind the primary */
  secondary?: React.ReactNode;
  /** Flip the layout so the visual sits on the left instead of the right */
  reverseLayout?: boolean;
  className?: string;
}

/**
 * Dark, gradient-accented marketing section with a large copy block
 * and a floating "product mockup" card. Accepts React nodes (not image
 * URLs) for the primary/secondary visuals so we can render live
 * component UI instead of static screenshots.
 */
export function SectionWithMockup({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  reverseLayout = false,
  className,
}: SectionWithMockupProps) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };
  const item = {
    hidden: { y: 40 },
    visible: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const textOrder = reverseLayout ? "md:col-start-2" : "";
  const imageOrder = reverseLayout ? "md:col-start-1 md:row-start-1" : "";

  return (
    <section className={cn("relative flex flex-col justify-center py-16 sm:py-20 md:py-24 bg-[#070a08] overflow-hidden min-h-[calc(100svh-64px)]", className)}>
      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/[0.06] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      </div>

      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className="grid grid-cols-1 gap-16 md:gap-12 w-full items-center md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Copy */}
          <motion.div
            className={cn(
              "flex flex-col items-start gap-5 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0",
              textOrder
            )}
            variants={item}
          >
            {eyebrow && (
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                {eyebrow}
              </div>
            )}
            <h2 className="text-white text-3xl md:text-[40px] font-extrabold leading-[1.1] tracking-tight">
              {title}
            </h2>
            <p className="text-[#c9d1d9] text-sm md:text-[15px] leading-7">{description}</p>
          </motion.div>

          {/* Visual */}
          <motion.div
            className={cn(
              "relative mt-10 md:mt-0 mx-auto w-full max-w-[520px]",
              imageOrder
            )}
            variants={item}
          >
            {/* Offset background card */}
            {secondary && (
              <motion.div
                className="absolute w-[85%] h-[85%] bg-[#0b0b0b] rounded-[28px] z-0 overflow-hidden border border-white/5"
                style={{
                  top: reverseLayout ? "auto" : "8%",
                  bottom: reverseLayout ? "8%" : "auto",
                  left: reverseLayout ? "auto" : "-6%",
                  right: reverseLayout ? "-6%" : "auto",
                  filter: "blur(0.5px)",
                  opacity: 0.92,
                }}
                initial={{ y: 0 }}
                whileInView={{ y: reverseLayout ? -18 : -24 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="w-full h-full p-5">{secondary}</div>
              </motion.div>
            )}

            {/* Primary floating card */}
            <motion.div
              className="relative w-full min-h-[440px] md:min-h-[560px] rounded-[28px] overflow-hidden z-10 border border-white/10 shadow-2xl shadow-emerald-500/10 bg-gradient-to-b from-[#0f1114] to-[#050506]"
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 18 : 24 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="h-full w-full">{primary}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
}

export default SectionWithMockup;
