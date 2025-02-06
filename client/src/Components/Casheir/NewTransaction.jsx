const NewTransaction = ({ cart, updateCartItemQuantity, updateCartItemDiscount }) => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">New Transaction</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Barcode</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Purchase Price</th>
              <th className="border p-2">Sell Price</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.barcode}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">${item.purchasePrice.toFixed(2)}</td>
                <td className="border p-2">${item.sellPrice.toFixed(2)}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => {
                      const newQty = Number.parseInt(e.target.value, 10)
                      updateCartItemQuantity(item.id, newQty)
                    }}
                    className="w-16 text-center"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.discount}
                    onChange={(e) => {
                      const newDiscount = Number.parseFloat(e.target.value)
                      updateCartItemDiscount(item.id, newDiscount)
                    }}
                    className="w-20 text-center"
                  />
                </td>
                <td className="border p-2">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default NewTransaction
  
  