import { FaDollarSign, FaSearch, FaCalculator, FaTrash, FaChartBar, FaKey, FaSignOutAlt } from "react-icons/fa"

const Sidebar = ({ activeTab, setActiveTab, cashierName }) => {
  const menuItems = [
    { key: "New Transaction", icon: FaDollarSign },
    { key: "Search Product", icon: FaSearch },
    { key: "Settle Payment", icon: FaCalculator },
    { key: "Clear Cart", icon: FaTrash },
    { key: "Daily Sales", icon: FaChartBar },
    { key: "Change Password", icon: FaKey },
  ]

  return (
    <div className="w-64 bg-indigo-800 text-white shadow-lg flex flex-col">
      <div className="p-4 border-b border-indigo-700">
        <h2 className="text-2xl font-bold mb-2">POS Menu</h2>
        <p className="text-sm text-indigo-300">Welcome, {cashierName}</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          {menuItems.map(({ key, icon: Icon }) => (
            <li key={key}>
              <button
                className={`flex items-center w-full px-4 py-2 text-left transition-colors ${
                  activeTab === key ? "bg-indigo-900 text-white" : "text-indigo-100 hover:bg-indigo-700"
                }`}
                onClick={() => setActiveTab(key)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{key}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-indigo-700">
        <button className="flex items-center text-indigo-100 hover:text-white transition-colors">
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

