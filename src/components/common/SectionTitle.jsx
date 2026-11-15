import React from "react";
import { Leaf } from "lucide-react";

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
  badge,
  light = false,
}) {
  return (
    <div className={`mb-14 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 border ${
            light
              ? "bg-white/10 border-white/20 text-amber-200"
              : "bg-emerald-900/8 border-emerald-800/15 text-emerald-900"
          }`}
        >
          <Leaf size={14} className={light ? "text-amber-300" : "text-emerald-700"} />
          <span className="text-xs font-bold uppercase tracking-[0.15em]">
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h2
        className={`font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight ${
          light ? "text-white" : "text-[#0F291E]"
        }`}
      >
        {title}
      </h2>

      {/* Decorative Accent Line */}
      <div
        className={`h-1 w-16 rounded-full mb-5 ${
          centered ? "mx-auto" : ""
        } bg-gradient-to-r from-emerald-700 to-[#C58F4B]`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-emerald-100/85" : "text-stone-600"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
