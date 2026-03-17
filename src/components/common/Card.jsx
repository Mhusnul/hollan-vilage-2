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
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {price && (
          <p className="text-2xl font-bold text-blue-600 mb-4">{price}</p>
        )}

        {/* Specs */}
        {specs && specs.length > 0 && (
          <div className="mb-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button */}
        {onDetailsClick && (
          <Button variant="primary" className="w-full" onClick={onDetailsClick}>
            Lihat Selengkapnya
          </Button>
        )}
      </div>
    </div>
  );
}
