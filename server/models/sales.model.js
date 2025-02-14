import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, required: true, unique: true },
    items: [
      {
        barcode: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        discount: { type: Number, default: 0 },
      },
    ],
    paymentType: { type: String, enum: ['cash', 'card', 'mobile'], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sales = mongoose.model('Sales', salesSchema);

export default Sales;
