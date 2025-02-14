"use client"

import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const SearchProduct = ({ products, searchTerm, setSearchTerm, addToCart }) => {
  const [visiblePurchasePrices, setVisiblePurchasePrices] = useState({})

  const togglePurchasePrice = async (productId) => {
    if (visiblePurchasePrices[productId]) {
      setVisiblePurchasePrices((prev) => ({ ...prev, [productId]: false }))
    } else {
      try {
        const response = await fetch(`http://localhost:4000/api/productlist/${productId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }
        const productDetails = await response.json()
        setVisiblePurchasePrices((prev) => ({ ...prev, [productId]: productDetails.purchasePrice }))
      } catch (error) {
        console.error("Error fetching purchase price:", error)
        alert("Failed to fetch purchase price. Please try again.")
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Product</h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter product name or barcode..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Barcode</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products
              .filter(
                (product) =>
                  product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.barcode.includes(searchTerm),
              )
              .map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span>৳{product.sellPrice.toFixed(2)}</span>
                      <button
                        onClick={() => togglePurchasePrice(product._id)}
                        className="ml-2 text-indigo-600 hover:text-indigo-900"
                      >
                        {visiblePurchasePrices[product._id] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {visiblePurchasePrices[product._id] && (
                      <div className="text-xs text-gray-500 mt-1">
                        Purchase: ৳{visiblePurchasePrices[product._id].toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.totalQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchProduct

