import React, { useState, useEffect, useRef } from 'react';
import { FaPrint } from 'react-icons/fa'; // Import print icon from react-icons

const PrintReceipt = ({ receipt, onClose }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const modalRef = useRef(null);
  const printButtonRef = useRef(null);

  // Close modal when clicking outside of the modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  // Handle the "Enter" key press to trigger printing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handlePrint();
      }
    };

    // Attach event listener to the document when printButtonRef is available
    if (printButtonRef.current) {
      printButtonRef.current.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (printButtonRef.current) {
        printButtonRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setIsPrinting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div 
        ref={modalRef}
        className="bg-white p-8 rounded-lg w-96 max-w-lg shadow-lg relative"
      >
        {/* Shop Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">Your Shop Name</h1>
          <p className="text-lg text-gray-600">1234 Main Street, City, Country</p>
        </div>

        {/* Receipt Title */}
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Payment Receipt</h2>

        {/* Transaction Information */}
        <div className="flex justify-between text-lg text-gray-700 mb-4">
          <div>
            <p><strong>Transaction No:</strong> {receipt.transactionNo}</p>
            <p><strong>Date:</strong> {receipt.date}</p>
            <p><strong>Payment Type:</strong> {receipt.paymentType}</p>
          </div>
        </div>

        {/* Item List Table (No Price Column) */}
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Item</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Qty</th>
              <th className="py-2 px-4 text-right text-gray-700 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.qty}</td>
                <td className="py-2 px-4 text-right">${item.total ? item.total.toFixed(2) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="mt-4 text-right text-lg text-gray-800 font-bold">
          <p>Total: ${receipt.total ? receipt.total.toFixed(2) : "N/A"}</p>
          <p>Amount Paid: ${receipt.paymentAmount ? receipt.paymentAmount.toFixed(2) : "N/A"}</p>
          <p>Change: ${receipt.change ? receipt.change.toFixed(2) : "N/A"}</p>
        </div>

        {/* Thank You Message */}
        <div className="mt-4 text-center text-sm italic text-gray-600">
          <p>Thank you for your purchase!</p>
        </div>

        {/* Print Icon */}
        {!isPrinting && (
          <div className="mt-6 flex justify-center">
            <button
              ref={printButtonRef}
              onClick={handlePrint}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
            >
              <FaPrint size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintReceipt;
