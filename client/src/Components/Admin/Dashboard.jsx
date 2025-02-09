import { useState } from "react"
import { FaTachometerAlt, FaBox, FaLayerGroup, FaBoxOpen, FaArrowAltCircleDown, FaDollarSign, FaChartLine, FaUserCog, FaStore, FaTruck } from "react-icons/fa";  // Import icons from react-icons
import { MdDashboard } from "react-icons/md";
import { LiaHistorySolid } from "react-icons/lia";
import { PiNotebookFill } from "react-icons/pi";
import { MdSell } from "react-icons/md";
import { MdAssignmentReturn } from "react-icons/md";

import Sidebar from "./Sidebar"
import DashboardContent from "./DashboardContent"
import ProductListContent from "./ProductListContent"
import CategoryContent from "./CategoryContent"
import BrandContent from "./BrandContent"
import StockEntryContent from "./StockEntryContent"
import StockAdjustmentsContent from "./StockAdjustmentsContent"
import PurchasedSuppliesContent from "./PurchasedSuppliesContent"
import PaidSuppliesContent from "./PaidSuppliesContent"
import SalesRecordContent from "./SalesRecordContent"
import PosRecordsContent from "./PosRecordsContent"
import UserContent from "./UserContent"
import StoreContent from "./StoreContent"
import DamageContent from "./DamageContent"
import PurchaseReturnGoodsContent from "./PurchaseReturnGoodsContent"
import ProfitLossReportContent from "./ProfitLossReportContent"
import SummaryReportContent from "./SummaryReportContent"
import DailyReportContent from "./DailyReportContent"
import CustomerLedgerContent from "./CustomerLedgerContent"
import SupplierLedgerContent from "./SupplierLedgerContent"
import SupplierDueReportContent from "./SupplierDueReportContent"
import PurchaseReportContent from "./PurchaseReportContent"
import LowStockReportContent from "./LowStockReportContent"
import SupplierContent from "./SupplierContent"

const sections = {
  Dashboard: { 
    icon: <MdDashboard />, 
    component: <DashboardContent /> 
  },
  Product: {
    icon: <FaBox />,
    subcategories: {
      "Product List": <ProductListContent />,
      Category: <CategoryContent />,
      Brand: <BrandContent />,
    },
  },
  "In Stock": {
    icon: <FaLayerGroup />,
    subcategories: {
      "Stock Entry": <StockEntryContent />,
      "Stock Adjustments": <StockAdjustmentsContent />,
    },
  },
  Damage: { 
    icon: <FaBoxOpen />, 
    component: <DamageContent /> 
  },
  Suppliers: { 
    icon: <FaTruck />, 
    component: <SupplierContent /> 
  },
  "Sales Returns": { 
    icon: <MdAssignmentReturn />, 
    component: <PurchaseReturnGoodsContent /> 
  },
  Expense: {
    icon: <PiNotebookFill />,
    subcategories: {
      "Purchased Supplies": <PurchasedSuppliesContent />,
      "Paid Supplies": <PaidSuppliesContent />,
    },
  },
  Sales: {
    icon: <MdSell />,
    subcategories: {
      "Sales Record": <SalesRecordContent />,
      "POS Records": <PosRecordsContent />,
    },
  },
  Reports: {
    icon: <FaChartLine />,
    subcategories: {
      "Profit Loss Report": <ProfitLossReportContent />,
      "Summary Report": <SummaryReportContent />,
      "Daily Report": <DailyReportContent />,
      "Customer Ledger": <CustomerLedgerContent />,
      "Supplier Ledger": <SupplierLedgerContent />,
      "Supplier Due Report": <SupplierDueReportContent />,
      "Purchase Report": <PurchaseReportContent />,
      "Low Stock Report": <LowStockReportContent />,
    },
  },
  Setting: {
    icon: <FaUserCog />,
    subcategories: {
      User: <UserContent />,
      Store: <StoreContent />,
    },
  },
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard")
  const [activeSubcategory, setActiveSubcategory] = useState("")

  const renderContent = () => {
    const section = sections[activeSection]
    if (!section) return null

    if (section.component) {
      return section.component
    }

    if (section.subcategories && activeSubcategory) {
      return section.subcategories[activeSubcategory]
    }

    return null
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        setActiveSection={setActiveSection}
        setActiveSubcategory={setActiveSubcategory}
        sections={sections}
        activeSection={activeSection}
        activeSubcategory={activeSubcategory}
      />
      <main className="flex-1 p-5 bg-gray-100">{renderContent()}</main>
    </div>
  )
}
