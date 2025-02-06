import { useState } from "react"

const PaymentModal = ({ total, onConfirm, onClose }) => {
  const [amount, setAmount] = useState("")
  const [paymentType, setPaymentType] = useState("cash")

  const handleSubmit = (e) => {
    e.preventDefault()
    const paymentAmount = Number.parseFloat(amount)
    if (isNaN(paymentAmount) || paymentAmount < total) {
      alert("Please enter a valid payment amount")
      return
    }
    onConfirm(paymentAmount, paymentType)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Total Amount: ${total.toFixed(2)}</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter payment amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payment Type:</label>
            <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="border p-2 w-full">
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black p-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentModal

