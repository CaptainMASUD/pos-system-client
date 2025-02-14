"use client"

import { useState } from "react"
import { FaPlus, FaMinus, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa"

const NewTransaction = ({
  cart,
  updateCartItemQuantity,
  updateCartItemDiscount,
  removeCartItem,
  globalDiscount,
  updateGlobalDiscount,
  calculateSubtotal,
  calculateTotalDiscount,
  calculateTotal,
  clearCart,
  settlePayment,
  showPaymentModal,
  setShowPaymentModal,
  onSaleComplete,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [visiblePurchasePrices, setVisiblePurchasePrices] = useState({})
  const [purchasePrices, setPurchasePrices] = useState({})

  const handleGlobalDiscountChange = (e) => {
    const newDiscount = Number.parseFloat(e.target.value) || 0
    updateGlobalDiscount(newDiscount)
  }

  const handleSettlePayment = async (paymentAmount, paymentType) => {
    try {
      const invoiceNo = `INV-${Date.now()}`

      const saleData = {
        invoiceNo,
        products: cart.map((item) => ({
          productBarcode: item.barcode,
          sellPrice: item.sellPrice,
          purchasePrice: item.purchasePrice || 0,
          qty: item.qty,
          discount: item.discount || 0,
        })),
        paymentType,
        paymentAmount,
        globalDiscount,
      }

      const response = await fetch("http://localhost:4000/api/sales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Server responded with ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const result = await response.json()
      console.log("Sale created successfully:", result)

      settlePayment(paymentAmount, paymentType)
      onSaleComplete(result.newSale)
    } catch (error) {
      console.error("Error creating sale:", error)
      alert(`Failed to process sale: ${error.message}. Please try again.`)
    }
  }

  const togglePurchasePrice = async (itemId) => {
    if (visiblePurchasePrices[itemId]) {
      setVisiblePurchasePrices((prev) => ({ ...prev, [itemId]: false }))
    } else {
      try {
        const response = await fetch(`http://localhost:4000/api/productlist/${itemId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }
        const productDetails = await response.json()
        setVisiblePurchasePrices((prev) => ({ ...prev, [itemId]: productDetails.purchasePrice }))
        setPurchasePrices((prev) => ({ ...prev, [itemId]: productDetails.purchasePrice }))
      } catch (error) {
        console.error("Error fetching purchase price:", error)
        alert("Failed to fetch purchase price. Please try again.")
      }
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cart.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.description}</div>
                      <div className="text-sm text-gray-500">{item.barcode}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span>৳{item.sellPrice.toFixed(2)}</span>
                    <button
                      onClick={() => togglePurchasePrice(item._id)}
                      className="ml-2 text-indigo-600 hover:text-indigo-900"
                    >
                      {visiblePurchasePrices[item._id] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {visiblePurchasePrices[item._id] && (
                    <div className="text-xs text-gray-500 mt-1">
                      Purchase: ৳{visiblePurchasePrices[item._id].toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateCartItemQuantity(item._id, item.qty - 1)}
                      className="text-red-500 hover:text-red-700 mr-2"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateCartItemQuantity(item._id, Number.parseInt(e.target.value))}
                      className="w-16 text-center border rounded-md"
                    />
                    <button
                      onClick={() => updateCartItemQuantity(item._id, item.qty + 1)}
                      className="text-green-500 hover:text-green-700 ml-2"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.discount || ""}
                    onChange={(e) => updateCartItemDiscount(item._id, Number.parseFloat(e.target.value))}
                    className="w-20 text-center border rounded-md"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ৳{(item.sellPrice * item.qty - (item.discount || 0)).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => removeCartItem(item._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cart.length === 0 && (
        <div className="text-center py-8 text-gray-500">No items in the cart. Scan or search for products to add.</div>
      )}
      {cart.length > 0 && (
        <div className="bg-gray-100 px-4 py-3 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>৳{calculateSubtotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-base font-medium text-gray-900 mt-2">
            <p>Global Discount</p>
            <div className="flex items-center">
              <span className="mr-2">৳</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={globalDiscount || ""}
                onChange={handleGlobalDiscountChange}
                className="w-24 text-right border rounded-md p-1"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
            <p>Total Discount</p>
            <p>৳{calculateTotalDiscount().toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
            <p>Total</p>
            <p>৳{calculateTotal().toFixed(2)}</p>
          </div>
          <button
            className="w-full mt-4 bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition duration-200 ease-in-out text-lg font-semibold"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Proceed to Payment
          </button>
          {isPaymentModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Payment</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const amount = Number.parseFloat(formData.get("amount"))
                    const paymentType = formData.get("paymentType")
                    handleSettlePayment(amount, paymentType)
                    setIsPaymentModalOpen(false)
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                    <div className="text-4xl font-bold text-green-600">৳{calculateTotal().toFixed(2)}</div>
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">৳</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        name="amount"
                        id="amount"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                    <div className="mt-1">
                      <select
                        name="paymentType"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="mobile">Mobile Payment</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsPaymentModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NewTransaction

