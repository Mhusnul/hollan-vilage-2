import React from "react";
import Button from "./Button";

export default function Card({
  image,
  title,
  description,
  price,
  specs,
  onDetailsClick,
  variant = "default",
}) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-smooth hover:shadow-lg">
      {/* Image Section */}
      {image && (
        <div className="relative w-full h-56 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
        )}

        {/* Price */}
        {price && (
          <p className="text-2xl font-bold text-gray-900 mb-4">{price}</p>
        )}

        {/* Specs */}
        {specs && specs.length > 0 && (
          <div className="mb-4 border-t border-slate-200 pt-4">
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-gray-900 font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button */}
        {onDetailsClick && (
          <Button
            size="md"
            variant="primary"
            onClick={onDetailsClick}
            className="w-full mt-auto"
          >
            Lihat Detail
          </Button>
        )}
      </div>
    </div>
  );
}
