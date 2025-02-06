import { useState } from "react"
import { FaChevronDown, FaChevronRight, FaSignOutAlt, FaMinus } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion" // Importing Framer Motion components

export default function Sidebar({
  setActiveSection,
  setActiveSubcategory,
  sections,
  activeSection,
  activeSubcategory,
}) {
  const [expandedSection, setExpandedSection] = useState(null) // Only one section can be expanded at a time

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section)) // Close if already open, else open new one
  }

  const handleSectionClick = (section) => {
    if (sections[section].subcategories) {
      toggleSection(section)
    } else {
      setActiveSection(section)
      setActiveSubcategory("")
    }
  }

  const handleSubcategoryClick = (section, subcategory) => {
    setActiveSection(section)
    setActiveSubcategory(subcategory)
  }

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...")
  }

  return (
    <aside className="w-64 bg-green-700 text-white flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div>
            <p className="text-lg font-bold">fahim1234</p>
            <p className="text-sm">Administrator</p>
          </div>
        </div>
        <nav className="space-y-2 flex-grow">
          {Object.keys(sections).map((section) => (
            <div key={section}>
              <button
                className={`flex items-center justify-between w-full text-left py-2 px-3 rounded hover:bg-green-800 ${activeSection === section ? "bg-green-800" : ""}`}
                onClick={() => handleSectionClick(section)}
              >
                <div className="flex items-center space-x-2">
                  {sections[section].icon && <span>{sections[section].icon}</span>}
                  <span>{section}</span>
                </div>
                {sections[section].subcategories &&
                  (expandedSection === section ? <FaChevronDown size={18} /> : <FaChevronRight size={18} />)}
              </button>
              {sections[section].subcategories && expandedSection === section && (
                <motion.div
                  className="ml-4 mt-2 space-y-2"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {Object.keys(sections[section].subcategories).map((subcategory) => (
                    <button
                      key={subcategory}
                      className={`block w-full text-left py-1 px-3 rounded hover:bg-green-800 text-sm ${activeSection === section && subcategory === activeSubcategory ? "bg-green-800" : ""}`}
                      onClick={() => handleSubcategoryClick(section, subcategory)}
                    >
                      <div className="flex items-center">
                        {expandedSection === section ? (
                          <FaMinus size={18} className="mr-2" />
                        ) : (
                          <FaChevronRight size={18} className="mr-2" />
                        )}
                        {subcategory}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <button className="mt-auto p-5 flex items-center justify-center hover:bg-green-800" onClick={handleLogout}>
        <FaSignOutAlt size={18} className="mr-2" />
        Logout
      </button>
    </aside>
  )
}
