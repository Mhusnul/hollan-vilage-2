import React from "react";

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-4xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
