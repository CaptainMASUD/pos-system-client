const TransactionDetails = ({
    transactionNo,
    time,
    barcode,
    setBarcode,
    handleBarcodeSubmit,
    calculateTotal,
    calculateTotalDiscount,
    calculateVAT,
  }) => {
    return (
      <div className="w-80 p-4 bg-white shadow-lg border-l">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
        <div className="mb-4">
          <p className="font-bold">Transaction No</p>
          <p>{transactionNo}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Date</p>
          <p>{time.toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Barcode</p>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Scan or enter barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleBarcodeSubmit(e)
              }
            }}
          />
        </div>
        <div className="mt-4">
          <p>
            Sales Total: <span className="float-right">${calculateTotal().toFixed(2)}</span>
          </p>
          <p>
            Discount: <span className="float-right">${calculateTotalDiscount().toFixed(2)}</span>
          </p>
          <p>
            VAT: <span className="float-right">${calculateVAT().toFixed(2)}</span>
          </p>
          <p>
            VATable: <span className="float-right">${(calculateTotal() - calculateVAT()).toFixed(2)}</span>
          </p>
        </div>
        <div className="mt-6 bg-teal-500 text-white text-center p-2 text-xl font-bold">{time.toLocaleTimeString()}</div>
      </div>
    )
  }
  
  export default TransactionDetails
  
  