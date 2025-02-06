import { useState } from "react"
import { Button, TextInput, Select, Table } from "flowbite-react"

export default function StockEntryContent() {
  const [stockEntry, setStockEntry] = useState({
    referenceNo: "",
    stockInBy: "fahim1234",
    stockInDate: new Date().toISOString().split("T")[0],
    supplier: "",
    contactPerson: "",
    address: "",
  })

  const [products, setProducts] = useState([])

  const generateReference = () => {
    const timestamp = Date.now()
    setStockEntry({ ...stockEntry, referenceNo: timestamp.toString() })
  }

  const handleInputChange = (e) => {
    setStockEntry({ ...stockEntry, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="w-32">Reference No:</label>
              <TextInput
                name="referenceNo"
                value={stockEntry.referenceNo}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button onClick={generateReference}>Generate</Button>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Stock In By:</label>
              <TextInput
                name="stockInBy"
                value={stockEntry.stockInBy}
                onChange={handleInputChange}
                className="flex-1"
                disabled
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Stock In Date:</label>
              <TextInput
                type="date"
                name="stockInDate"
                value={stockEntry.stockInDate}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="w-32">Supplier:</label>
              <Select name="supplier" value={stockEntry.supplier} onChange={handleInputChange} className="flex-1">
                <option value="">Select Supplier</option>
                <option value="ACI ltd">ACI ltd</option>
                {/* Add more suppliers */}
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Contact Person:</label>
              <TextInput
                name="contactPerson"
                value={stockEntry.contactPerson}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Address:</label>
              <TextInput name="address" value={stockEntry.address} onChange={handleInputChange} className="flex-1" />
            </div>
          </div>
        </div>

        <Button className="mb-4">Click here to browse product</Button>

        <Table striped>
          <Table.Head className="bg-emerald-600 text-white">
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Reference#</Table.HeadCell>
            <Table.HeadCell>Pcode</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Qty</Table.HeadCell>
            <Table.HeadCell>Stock In Date</Table.HeadCell>
            <Table.HeadCell>Stock In By</Table.HeadCell>
            <Table.HeadCell>Supplier</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {products.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{product.reference}</Table.Cell>
                <Table.Cell>{product.pcode}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>{product.qty}</Table.Cell>
                <Table.Cell>{product.stockInDate}</Table.Cell>
                <Table.Cell>{product.stockInBy}</Table.Cell>
                <Table.Cell>{product.supplier}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex justify-end mt-4">
          <Button color="success">Entry</Button>
        </div>
      </div>
    </div>
  )
}

