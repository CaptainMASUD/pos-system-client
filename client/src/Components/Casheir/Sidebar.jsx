import { DollarSign, Search, Calculator, Trash2, BarChart, Key, LogOut } from "lucide-react"

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { key: "New Transaction", icon: <DollarSign className="w-5 h-5" /> },
    { key: "Search Product", icon: <Search className="w-5 h-5" /> },
    { key: "Add Discount", icon: <DollarSign className="w-5 h-5" /> },
    { key: "Settle Payment", icon: <Calculator className="w-5 h-5" /> },
    { key: "Clear Cart", icon: <Trash2 className="w-5 h-5" /> },
    { key: "Daily Sales", icon: <BarChart className="w-5 h-5" /> },
    { key: "Change Password", icon: <Key className="w-5 h-5" /> },
  ]

  return (
    <div className="w-64 p-4 bg-indigo-700 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">POS Menu</h2>
      <ul className="space-y-2">
        {menuItems.map(({ key, icon }) => (
          <li
            key={key}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeTab === key ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {icon}
            <span className="ml-3">{key}</span>
          </li>
        ))}
        <li className="flex items-center p-3 rounded-lg cursor-pointer text-red-300 hover:bg-indigo-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

