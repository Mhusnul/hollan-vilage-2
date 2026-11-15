import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-[0.98]";

  const variants = {
    primary:
      "bg-emerald-900 text-white hover:bg-emerald-800 focus:ring-emerald-800 shadow-md shadow-emerald-950/15 hover:shadow-lg hover:shadow-emerald-950/20",
    secondary:
      "bg-[#C58F4B] text-white hover:bg-[#B07B38] focus:ring-[#C58F4B] shadow-md shadow-amber-950/15",
    outline:
      "border-2 border-emerald-900 text-emerald-950 hover:bg-emerald-900 hover:text-white focus:ring-emerald-800",
    ghost:
      "text-emerald-950 hover:bg-emerald-900/10 focus:ring-emerald-700",
    light:
      "bg-white text-emerald-950 hover:bg-[#F3EFE6] focus:ring-white shadow-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-5 py-2.5 text-sm md:text-base gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
    xl: "px-8 py-4 text-base md:text-lg gap-3",
    icon: "p-2.5 h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
