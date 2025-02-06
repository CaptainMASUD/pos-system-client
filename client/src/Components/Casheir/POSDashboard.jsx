import { useState, useEffect } from "react"
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
  const [discount, setDiscount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [dailySales, setDailySales] = useState([])
  const [showPrintReceipt, setShowPrintReceipt] = useState(false)
  const [currentReceipt, setCurrentReceipt] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
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

  const addToCart = (product) => {
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
    setBarcode("")
  }

  const handleBarcodeSubmit = (e) => {
    e.preventDefault()
    const product = products.find((p) => p.barcode === barcode)
    if (product) {
      addToCart(product)
    } else {
      alert("Product not found")
    }
  }

  const clearCart = () => {
    setCart([])
    setDiscount(0)
  }

  const applyDiscount = () => {
    const totalBeforeDiscount = calculateTotal()
    const maxDiscount = totalBeforeDiscount
    const appliedDiscount = Math.min(discount, maxDiscount)

    setCart(
      cart.map((item) => {
        const itemDiscount = (item.total / totalBeforeDiscount) * appliedDiscount
        return {
          ...item,
          total: Math.max(item.total - itemDiscount, 0),
        }
      }),
    )
    setDiscount(0)
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
        vat: calculateVAT(),
        total: total,
        paymentAmount: paymentAmount,
        change: change,
        paymentType: paymentType,
        items: cart,
      }
      setCurrentReceipt(newSale)
      setShowSuccessMessage(true)
      setShowPrintReceipt(true)
      clearCart()
      setTransactionNo((prevNo) => {
        const newNo = prevNo + 1
        localStorage.setItem("lastTransactionNo", newNo.toString())
        return newNo
      })
    } else {
      alert("Insufficient payment amount")
    }
    setShowPaymentModal(false)
  }

  const handlePrintComplete = () => {
    setDailySales([...dailySales, currentReceipt])
    setShowPrintReceipt(false)
    setShowSuccessMessage(false)
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.sellPrice * item.qty, 0)
  }

  const calculateTotalDiscount = () => {
    return cart.reduce((sum, item) => sum + item.discount, 0)
  }

  const calculateVAT = () => {
    return calculateTotal() * 0.1 // Assuming 10% VAT
  }

  const updateCartItemQuantity = (id, newQty) => {
    const validQty = Number.isNaN(newQty) || newQty < 1 ? 1 : Math.floor(newQty)
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: validQty, total: validQty * item.sellPrice - item.discount } : item,
      ),
    )
  }

  const updateCartItemDiscount = (id, newDiscount) => {
    const validDiscount = Number.isNaN(newDiscount) || newDiscount < 0 ? 0 : Number(newDiscount)
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, discount: validDiscount, total: item.qty * item.sellPrice - validDiscount } : item,
      ),
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "New Transaction":
        return (
          <NewTransaction
            cart={cart}
            updateCartItemQuantity={updateCartItemQuantity}
            updateCartItemDiscount={updateCartItemDiscount}
          />
        )
      case "Search Product":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Search Product</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Enter product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border p-2">Barcode</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product) => product.description.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product) => (
                    <tr key={product.id} className="text-center">
                      <td className="border p-2">{product.barcode}</td>
                      <td className="border p-2">{product.description}</td>
                      <td className="border p-2">${product.sellPrice.toFixed(2)}</td>
                      <td className="border p-2">{product.stock}</td>
                      <td className="border p-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )
      case "Add Discount":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add Discount</h2>
            <input
              type="number"
              step="0.01"
              min="0"
              className="border p-2 w-full mb-4"
              placeholder="Enter discount amount..."
              value={discount}
              onChange={(e) => setDiscount(Math.max(0, Number.parseFloat(e.target.value) || 0))}
            />
            <button className="bg-green-500 text-white p-2 rounded" onClick={applyDiscount}>
              Apply Discount
            </button>
          </div>
        )
      case "Settle Payment":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Settle Payment</h2>
            <p className="text-xl mb-4">Total Amount: ${calculateTotal().toFixed(2)}</p>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setShowPaymentModal(true)}>
              Confirm Payment
            </button>
          </div>
        )
      case "Clear Cart":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Clear Cart</h2>
            <p className="mb-4">Are you sure you want to clear the cart?</p>
            <button className="bg-red-500 text-white p-2 rounded" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )
      case "Daily Sales":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Daily Sales</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border p-2">Transaction No</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {dailySales.map((sale) => (
                  <tr key={sale.transactionNo} className="text-center">
                    <td className="border p-2">{sale.transactionNo}</td>
                    <td className="border p-2">{sale.date}</td>
                    <td className="border p-2">${sale.total.toFixed(2)}</td>
                    <td className="border p-2">{sale.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xl mt-4">
              Today's total sales: ${dailySales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
            </p>
          </div>
        )
      case "Change Password":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Enter new password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={() => {
                alert("Password changed successfully!")
                setNewPassword("")
              }}
            >
              Change Password
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} cashierName={cashierName} />

      {/* Middle Section (Dynamic Component) */}
      <div className="flex-1 p-4 overflow-auto bg-white shadow-md">
        {showSuccessMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Payment processed successfully.</span>
          </div>
        )}
        {renderContent()}
      </div>

      <TransactionDetails
        transactionNo={transactionNo}
        time={time}
        barcode={barcode}
        setBarcode={setBarcode}
        handleBarcodeSubmit={handleBarcodeSubmit}
        calculateTotal={calculateTotal}
        calculateTotalDiscount={calculateTotalDiscount}
        calculateVAT={calculateVAT}
      />

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

