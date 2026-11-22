"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

export const Feature = ({
  title,
  description,
  icon,
  tag,
}: FeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(180px 180px at ${offsetX}px ${offsetY}px, black, transparent)`;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      offsetX.set(e.clientX - rect.left);
      offsetY.set(e.clientY - rect.top);
    };

    const element = cardRef.current;
    element?.addEventListener("mousemove", handleMouseMove);

    return () => {
      element?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [offsetX, offsetY]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Interactive cursor tracking spotlight border */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-indigo-400 transition-opacity duration-300"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div>
        <div className="flex items-center justify-between">
          {/* Icon Container: Fixed size, no distortion */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-cyan-400 border border-indigo-500/20 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-transform">
            {icon}
          </div>

          {tag && (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {tag}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
          {title}
        </h3>
        <p className="mt-2.5 text-sm sm:text-base text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-cyan-300 transition-colors">
        <span>Active in ChatYol</span>
        <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
};
