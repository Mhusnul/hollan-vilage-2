import React from "react";

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
  badge,
}) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 mb-4">
          <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
