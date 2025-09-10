'use client'

import React, { useState, useMemo } from 'react'

interface Column<T> {
  header: string
  accessor: keyof T
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
}

function SearchableTable<T extends { [key: string]: any }>({ data, columns }: TableProps<T>) {
  const [search, setSearch] = useState('')

  // تصفية البيانات حسب البحث
  const filteredData = useMemo(() => {
    if (!search) return data
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, data, columns])

  return (
    <div className="space-y-4">
      {/* حقل البحث */}
      <input
        type="text"
        placeholder="ابحث هنا..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* الجدول */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor as string}
                  className="p-2 text-left border-b border-gray-200"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.accessor as string} className="p-2 border-b border-gray-200">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="p-2 text-center text-gray-400">
                  لا توجد بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchableTable
