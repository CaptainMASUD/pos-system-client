"use client"

import { useState, useEffect } from "react"

const DailySales = () => {
  const [dailySales, setDailySales] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/sales/")
        if (!response.ok) {
          throw new Error("Failed to fetch sales data")
        }
        const data = await response.json()
        setDailySales(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching sales:", error)
        setError("Failed to load sales data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchSales()
  }, [])

  if (isLoading) {
    return <div className="p-4">Loading sales data...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  const totalSales = dailySales.reduce((sum, sale) => sum + (sale.total || 0), 0)

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Sales</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Invoice No</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dailySales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.invoiceNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sale.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ৳{sale.total ? sale.total.toFixed(2) : "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-xl font-semibold text-indigo-600">Today's total sales: ৳{totalSales.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default DailySales

