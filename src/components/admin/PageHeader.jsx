import React from "react";

export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
      <div>
        <h1 className="text-3xl font-bold text-black">{title}</h1>
        {description && <p className="mt-1 text-gray-600">{description}</p>}
      </div>
      {action && <div className="mt-4 md:mt-0">{action}</div>}
    </div>
  );
}
