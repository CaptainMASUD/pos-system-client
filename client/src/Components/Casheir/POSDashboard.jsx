"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "./Sidebar"
import PaymentModal from "./PaymentModal"
import PrintReceipt from "./PrintReceipt"
import TransactionDetails from "./TransactionDetails"
import NewTransaction from "./NewTransaction"

// Dummy product data (updated with purchase price)
const products = [
  { id: 1, barcode: "123456789", description: "Product A", purchasePrice: 8.0, sellPrice: 10.0, stock: 100 },
  { id: 2, barcode: "987654321", description: "Product B", purchasePrice: 4.0, sellPrice: 5.0, stock: 150 },
  { id: 3, barcode: "456789123", description: "Product C", purchasePrice: 12.0, sellPrice: 15.0, stock: 75 },
]

const POSDashboard = () => {
  const [activeTab, setActiveTab] = useState("New Transaction")
  const [time, setTime] = useState(new Date())
  const [cart, setCart] = useState([])
  const [barcode, setBarcode] = useState("")
  const [transactionNo, setTransactionNo] = useState(1)
  const [globalDiscount, setGlobalDiscount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showPrintReceipt, setShowPrintReceipt] = useState(false)
  const [currentReceipt, setCurrentReceipt] = useState(null)
  const [dailySales, setDailySales] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState({ visible: false, message: "" })
  const [cashierName, setCashierName] = useState("John Doe")

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem("lastTransactionDate")
    if (storedDate !== today) {
      setTransactionNo(1)
      localStorage.setItem("lastTransactionDate", today)
    } else {
      const lastTransactionNo = Number.parseInt(localStorage.getItem("lastTransactionNo") || "1")
      setTransactionNo(lastTransactionNo)
    }
  }, [])

  const addToCart = useCallback(
    (product) => {
      const existingItem = cart.find((item) => item.id === product.id)
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.sellPrice, discount: 0 }
              : item,
          ),
        )
      } else {
        setCart([...cart, { ...product, qty: 1, total: product.sellPrice, discount: 0 }])
      }
    },
    [cart],
  )

  const handleBarcodeSubmit = useCallback(
    (scannedBarcode) => {
      const product = products.find((p) => p.barcode === scannedBarcode)
      if (product) {
        addToCart(product)
        return true
      } else {
        return false
      }
    },
    [addToCart],
  )

  const clearCart = () => {
    setCart([])
    setGlobalDiscount(0)
  }

  const settlePayment = (paymentAmount, paymentType) => {
    const total = calculateTotal()
    if (paymentAmount >= total) {
      const change = paymentAmount - total
      const newSale = {
        transactionNo: transactionNo,
        date: new Date().toLocaleString(),
        subtotal: calculateSubtotal(),
        totalDiscount: calculateTotalDiscount(),
        vat: 0,
        total: total,
        paymentAmount: paymentAmount,
        change: change,
        paymentType: paymentType,
        items: cart,
      }
      setCurrentReceipt(newSale)
      setDailySales([...dailySales, newSale])
      setShowPrintReceipt(true)
      clearCart()
      setTransactionNo((prevNo) => {
        const newNo = prevNo + 1
        localStorage.setItem("lastTransactionNo", newNo.toString())
        return newNo
      })
      setShowSuccessMessage({ visible: true, message: "Payment processed successfully." })
      setTimeout(() => setShowSuccessMessage({ visible: false, message: "" }), 3000)
    } else {
      alert("Insufficient payment amount")
    }
    setShowPaymentModal(false)
  }

  const handlePrintComplete = () => {
    setShowPrintReceipt(false)
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTotalDiscount = () => {
    return cart.reduce((sum, item) => sum + (item.discount || 0), 0) + globalDiscount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateTotalDiscount()
  }

  const updateCartItemQuantity = (id, newQty) => {
    const validQty = isNaN(newQty) || newQty < 1 ? 1 : Math.floor(newQty)
    setCart(cart.map((item) => (item.id === id ? { ...item, qty: validQty, total: validQty * item.sellPrice } : item)))
  }

  const updateCartItemDiscount = (id, newDiscount) => {
    const validDiscount = isNaN(newDiscount) || newDiscount < 0 ? 0 : Number(newDiscount)
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              discount: validDiscount,
            }
          : item,
      ),
    )
  }

  const removeCartItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateGlobalDiscount = (newDiscount) => {
    setGlobalDiscount(newDiscount)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "New Transaction":
        return (
          <NewTransaction
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            updateCartItemDiscount={updateCartItemDiscount}
            removeCartItem={removeCartItem}
            globalDiscount={globalDiscount}
            updateGlobalDiscount={updateGlobalDiscount}
            calculateSubtotal={calculateSubtotal}
            calculateTotalDiscount={calculateTotalDiscount}
            calculateTotal={calculateTotal}
          />
        )
      case "Search Product":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Search Product</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Barcode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products
                    .filter((product) => product.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.barcode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ৳{product.sellPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
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
      case "Settle Payment":
        return (
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Settle Payment</h2>
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-xl font-semibold text-gray-700">Total Amount</p>
              <p className="text-3xl font-bold text-indigo-600">৳{calculateTotal().toFixed(2)}</p>
            </div>
            <button
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-200 ease-in-out text-lg font-semibold"
              onClick={() => setShowPaymentModal(true)}
            >
              Proceed to Payment
            </button>
          </div>
        )
      case "Clear Cart":
        return (
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Clear Cart</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to clear all items from the cart?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                onClick={() => setActiveTab("New Transaction")}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )
      case "Daily Sales":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Daily Sales</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dailySales.map((sale) => (
                    <tr key={sale.transactionNo} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.transactionNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{sale.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.paymentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-indigo-600">
                Today's total sales: ৳{dailySales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        )
      case "Change Password":
        return (
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert("Password changed successfully!")
                setNewPassword("")
              }}
            >
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
              >
                Change Password
              </button>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} cashierName={cashierName} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          {showSuccessMessage.visible && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {showSuccessMessage.message}</span>
            </div>
          )}
          {renderContent()}
        </div>

        <TransactionDetails
          transactionNo={transactionNo}
          time={time}
          handleBarcodeSubmit={handleBarcodeSubmit}
          calculateTotal={calculateTotal}
          calculateTotalDiscount={calculateTotalDiscount}
        />
      </div>

      {showPaymentModal && (
        <PaymentModal total={calculateTotal()} onConfirm={settlePayment} onClose={() => setShowPaymentModal(false)} />
      )}

      {showPrintReceipt && (
        <PrintReceipt
          receipt={currentReceipt}
          onClose={() => setShowPrintReceipt(false)}
          onPrintComplete={handlePrintComplete}
        />
      )}
    </div>
  )
}

export default POSDashboard

