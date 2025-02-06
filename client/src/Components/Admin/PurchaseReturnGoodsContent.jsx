import { useState } from "react"
import { Table, Button, Modal, TextInput, Select } from "flowbite-react"
import { FaPlus, FaTrash } from "react-icons/fa"

export default function PurchaseReturnContent({ products = [] }) {
  const [returnRecords, setReturnRecords] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newReturn, setNewReturn] = useState({
    product: "",
    barcode: "",
    category: "",
    brand: "",
    price: "",
    quantity: "",
    reason: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReturn({ ...newReturn, [name]: value })
  }

  const handleAddReturn = () => {
    setReturnRecords([...returnRecords, { ...newReturn, id: Date.now() }])
    setShowModal(false)
    setNewReturn({ product: "", barcode: "", category: "", brand: "", price: "", quantity: "", reason: "" })
  }

  const handleDelete = (returnId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setReturnRecords(returnRecords.filter((record) => record.id !== returnId))
    }
  }

  const handleProductChange = (e) => {
    const selectedProduct = products.find((product) => product.description === e.target.value)
    setNewReturn({
      ...newReturn,
      product: selectedProduct?.description || "",
      barcode: selectedProduct?.barcode || "",
      category: selectedProduct?.category || "",
      brand: selectedProduct?.brand || "",
      price: selectedProduct?.sellPrice || "",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Return Goods</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Barcode</Table.HeadCell>
          <Table.HeadCell>Product</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Return Reason</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {returnRecords.map((record, index) => (
            <Table.Row key={record.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{record.barcode}</Table.Cell>
              <Table.Cell>{record.product}</Table.Cell>
              <Table.Cell>{record.category}</Table.Cell>
              <Table.Cell>{record.brand}</Table.Cell>
              <Table.Cell>${record.price}</Table.Cell>
              <Table.Cell>{record.quantity}</Table.Cell>
              <Table.Cell>{record.reason}</Table.Cell>
              <Table.Cell>
                <Button color="failure" size="sm" onClick={() => handleDelete(record.id)}>
                  <FaTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-4">
        <Button onClick={() => setShowModal(true)}>
          <FaPlus className="mr-2" /> Add Return Record
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add Return Record</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Select name="product" value={newReturn.product} onChange={handleProductChange}>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.description}>
                  {product.description}
                </option>
              ))}
            </Select>
            <TextInput name="barcode" value={newReturn.barcode} onChange={handleInputChange} placeholder="Barcode" />
            <TextInput name="category" value={newReturn.category} readOnly placeholder="Category" />
            <TextInput name="brand" value={newReturn.brand} readOnly placeholder="Brand" />
            <TextInput name="price" value={newReturn.price} readOnly placeholder="Price" />
            <TextInput
              name="quantity"
              value={newReturn.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              type="number"
            />
            <TextInput
              name="reason"
              value={newReturn.reason}
              onChange={handleInputChange}
              placeholder="Reason for Return"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddReturn}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
