import Sales from '../models/sales.model.js';

// Create a new sale
export const createSale = async (req, res) => {
  try {
    const { invoiceNo, items, paymentType, total } = req.body;

    const newSale = new Sales({ invoiceNo, items, paymentType, total });
    await newSale.save();

    res.status(201).json({ message: 'Sale recorded successfully', sale: newSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single sale by Invoice No
export const getSaleByInvoice = async (req, res) => {
  try {
    const sale = await Sales.findOne({ invoiceNo: req.params.invoiceNo });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sale
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findOneAndDelete({ invoiceNo: req.params.invoiceNo });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
