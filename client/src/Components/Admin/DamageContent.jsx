import { useState } from "react"
import { Table, Button, Modal, TextInput, Select } from "flowbite-react"
import { FaPlus, FaTrash } from "react-icons/fa"

export default function DamageContent({ products = [] }) {
  const [damageRecords, setDamageRecords] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newDamage, setNewDamage] = useState({
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
    setNewDamage({ ...newDamage, [name]: value })
  }

  const handleAddDamage = () => {
    setDamageRecords([...damageRecords, { ...newDamage, id: Date.now() }])
    setShowModal(false)
    setNewDamage({ product: "", barcode: "", category: "", brand: "", price: "", quantity: "", reason: "" })
  }

  const handleDelete = (damageId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setDamageRecords(damageRecords.filter((record) => record.id !== damageId))
    }
  }

  const handleProductChange = (e) => {
    const selectedProduct = products.find((product) => product.description === e.target.value)
    setNewDamage({
      ...newDamage,
      product: selectedProduct?.description || "",
      barcode: selectedProduct?.barcode || "",
      category: selectedProduct?.category || "",
      brand: selectedProduct?.brand || "",
      price: selectedProduct?.sellPrice || "",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Damaged Products</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Barcode</Table.HeadCell>
          <Table.HeadCell>Product</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Reason</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {damageRecords.map((record, index) => (
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
          <FaPlus className="mr-2" /> Add Damage Record
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add Damage Record</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Select name="product" value={newDamage.product} onChange={handleProductChange}>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.description}>
                  {product.description}
                </option>
              ))}
            </Select>
            <TextInput name="barcode" value={newDamage.barcode} onChange={handleInputChange} placeholder="Barcode" />
            <TextInput name="category" value={newDamage.category} readOnly placeholder="Category" />
            <TextInput name="brand" value={newDamage.brand} readOnly placeholder="Brand" />
            <TextInput name="price" value={newDamage.price} readOnly placeholder="Price" />
            <TextInput
              name="quantity"
              value={newDamage.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              type="number"
            />
            <TextInput
              name="reason"
              value={newDamage.reason}
              onChange={handleInputChange}
              placeholder="Reason for Damage"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddDamage}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
