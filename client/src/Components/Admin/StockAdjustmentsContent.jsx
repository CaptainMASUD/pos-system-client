import { useState } from "react"
import { Button, TextInput, Select, Table } from "flowbite-react"
import { FaUser, FaSearch } from "react-icons/fa"

export default function StockAdjustmentsContent() {
  const [adjustment, setAdjustment] = useState({
    referenceNo: "",
    productCode: "",
    description: "",
    action: "",
    quantity: "",
    remarks: "",
  })

  const [products, setProducts] = useState([
    {
      no: 1,
      pcode: "1",
      barcode: "2132323",
      description: "Gixxer fi abs",
      brand: "suzuki",
      category: "Motorcycle",
      price: "250000.00",
      stockOnHand: "2",
    },
    // Add more sample products
  ])

  const handleInputChange = (e) => {
    setAdjustment({ ...adjustment, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <FaUser className="text-2xl mr-2" />
          <span className="text-lg">fahim1234</span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="w-32">Reference No:</label>
              <TextInput name="referenceNo" value={adjustment.referenceNo} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Product Code:</label>
              <TextInput name="productCode" value={adjustment.productCode} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Description:</label>
              <TextInput name="description" value={adjustment.description} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="w-32">Action:</label>
              <Select name="action" value={adjustment.action} onChange={handleInputChange}>
                <option value="">Select Action</option>
                <option value="add">Add Stock</option>
                <option value="remove">Remove Stock</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Quantity:</label>
              <TextInput name="quantity" type="number" value={adjustment.quantity} onChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Remarks:</label>
              <TextInput name="remarks" value={adjustment.remarks} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <Table striped>
          <Table.Head className="bg-emerald-600 text-white">
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Pcode</Table.HeadCell>
            <Table.HeadCell>Barcode</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Stock On Hand</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.no}>
                <Table.Cell>{product.no}</Table.Cell>
                <Table.Cell>{product.pcode}</Table.Cell>
                <Table.Cell>{product.barcode}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.stockOnHand}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <TextInput placeholder="Search here" icon={FaSearch} />
          </div>
          <Button color="success">Save</Button>
        </div>
      </div>
    </div>
  )
}

