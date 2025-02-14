import express from 'express';
import { createSale, getSales, getSaleByInvoice, deleteSale } from '../controllers/sales.controller.js';

const router = express.Router();

// Routes
router.post('/', createSale);
router.get('/', getSales);
router.get('/:invoiceNo', getSaleByInvoice);
router.delete('/:invoiceNo', deleteSale);

export default router;
