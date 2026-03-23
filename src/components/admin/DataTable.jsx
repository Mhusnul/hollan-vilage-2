import React, { useState } from "react";
import { Edit2, Trash2, ChevronDown } from "lucide-react";

export default function DataTable({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <p className="mt-4 text-gray-600">Memuat...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Tidak ada data</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                <button onClick={() => setExpandedRow(null)}>
                  <ChevronDown size={16} />
                </button>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-sm font-semibold text-black"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <React.Fragment key={row.id}>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-3">
                    <button
                      onClick={() =>
                        setExpandedRow(expandedRow === row.id ? null : row.id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition ${
                          expandedRow === row.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-3 text-sm">
                      {col.render
                        ? col.render(row[col.key], row)
                        : typeof row[col.key] === "object"
                          ? JSON.stringify(row[col.key]).substring(0, 50) +
                            "..."
                          : String(row[col.key]).substring(0, 50)}
                    </td>
                  ))}
                  <td className="px-6 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit?.(row)}
                        className="text-black hover:text-gray-600 inline-flex items-center gap-1"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === row.id && (
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td colSpan={columns.length + 2} className="px-6 py-4">
                      <details className="text-sm text-gray-700">
                        <summary className="cursor-pointer font-medium mb-2 hover:text-gray-900">
                          Lihat Detail Lengkap
                        </summary>
                        <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs">
                          {JSON.stringify(row, null, 2)}
                        </pre>
                      </details>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
