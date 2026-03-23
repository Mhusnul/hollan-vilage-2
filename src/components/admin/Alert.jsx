import React from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Alert({ type = "info", title, message, onClose }) {
  const bgColor = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  }[type];

  const textColor = {
    success: "text-green-900",
    error: "text-red-900",
    warning: "text-yellow-900",
    info: "text-blue-900",
  }[type];

  const iconColor = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  }[type];

  const IconComponent = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }[type];

  return (
    <div className={`border rounded-lg p-4 mb-4 ${bgColor}`}>
      <div className="flex gap-3">
        <IconComponent className={`flex-shrink-0 ${iconColor}`} size={20} />
        <div>
          {title && <h3 className={`font-semibold ${textColor}`}>{title}</h3>}
          {message && <p className={`text-sm mt-1 ${textColor}`}>{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto flex-shrink-0 ${textColor} hover:opacity-70`}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
