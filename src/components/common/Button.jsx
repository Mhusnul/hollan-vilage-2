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
    "inline-flex items-center justify-center font-medium rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-900 focus:ring-gray-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-600 border border-gray-300",
    outline:
      "border-2 border-black text-black hover:bg-gray-50 focus:ring-gray-800",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-600",
    danger:
      "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-2",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-3",
    xl: "px-8 py-4 text-lg gap-3",
    icon: "p-2 h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
