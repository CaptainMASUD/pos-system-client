import { useState } from "react"
import { Card, Button, TextInput, Textarea } from "flowbite-react"
import { FaSave } from "react-icons/fa"

export default function StoreContent() {
  const [storeSettings, setStoreSettings] = useState({
    name: "My Store",
    address: "123 Main St, City, Country",
    phone: "+1 234 567 8900",
    email: "store@example.com",
    invoiceHeader: "Thank you for your purchase!",
    invoiceFooter: "Please come again!",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStoreSettings({ ...storeSettings, [name]: value })
  }

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a backend
    console.log("Saving settings:", storeSettings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Store Settings</h1>

      <Card>
        <h5 className="text-xl font-bold mb-4">General Information</h5>
        <div className="space-y-4">
          <TextInput label="Store Name" name="name" value={storeSettings.name} onChange={handleInputChange} />
          <Textarea
            label="Address"
            name="address"
            value={storeSettings.address}
            onChange={handleInputChange}
            rows={3}
          />
          <TextInput label="Phone" name="phone" value={storeSettings.phone} onChange={handleInputChange} />
          <TextInput label="Email" name="email" type="email" value={storeSettings.email} onChange={handleInputChange} />
        </div>
      </Card>

      <Card className="mt-6">
        <h5 className="text-xl font-bold mb-4">Invoice/Cash Memo Settings</h5>
        <div className="space-y-4">
          <Textarea
            label="Invoice Header"
            name="invoiceHeader"
            value={storeSettings.invoiceHeader}
            onChange={handleInputChange}
            rows={3}
          />
          <Textarea
            label="Invoice Footer"
            name="invoiceFooter"
            value={storeSettings.invoiceFooter}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
      </Card>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveSettings}>
          <FaSave className="mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  )
}

