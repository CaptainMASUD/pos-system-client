import { useState } from "react"
import { Table, Button, Modal, TextInput, Select } from "flowbite-react"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function ProductListContent({ categories = [], brands = [] }) {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    barcode: "",
    description: "",
    category: "",
    brand: "",
    purchasePrice: "",
    sellPrice: "",
    quantity: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value })
    } else {
      setNewProduct({ ...newProduct, [name]: value })
    }
  }

  const handleAddProduct = () => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
      setEditingProduct(null)
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }])
    }
    setShowModal(false)
    setNewProduct({
      barcode: "",
      description: "",
      category: "",
      brand: "",
      purchasePrice: "",
      sellPrice: "",
      quantity: "",
    })
  }

  const generateBarcode = () => {
    // Implement barcode generation logic here
    const barcode = Math.floor(100000000 + Math.random() * 900000000).toString()
    setNewProduct({ ...newProduct, barcode })
  }

  const downloadBarcode = () => {
    // Implement barcode download logic here
    console.log("Downloading barcode...")
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setNewProduct(product)
    setShowModal(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Barcode</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Purchase Price</Table.HeadCell>
          <Table.HeadCell>Sell Price</Table.HeadCell>
          <Table.HeadCell>Total Quantity</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products.map((product, index) => (
            <Table.Row key={product.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{product.barcode}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>{product.purchasePrice}</Table.Cell>
              <Table.Cell>{product.sellPrice}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color="info" size="sm" onClick={() => handleEdit(product)}>
                    <FaEdit />
                  </Button>
                  <Button color="failure" size="sm" onClick={() => handleDelete(product.id)}>
                    <FaTrash />
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-4">
        <Button onClick={() => setShowModal(true)}>
          <FaPlus className="mr-2" /> Add Product
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput name="barcode" value={newProduct.barcode} onChange={handleInputChange} placeholder="Barcode" />
            <div className="flex space-x-2">
              <Button onClick={generateBarcode}>Generate Barcode</Button>
              <Button onClick={downloadBarcode}>Download Barcode</Button>
            </div>
            <TextInput
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <Select name="category" value={newProduct.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Select name="brand" value={newProduct.brand} onChange={handleInputChange}>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </Select>
            <TextInput
              name="purchasePrice"
              value={newProduct.purchasePrice}
              onChange={handleInputChange}
              placeholder="Purchase Price"
              type="number"
            />
            <TextInput
              name="sellPrice"
              value={newProduct.sellPrice}
              onChange={handleInputChange}
              placeholder="Sell Price"
              type="number"
            />
            <TextInput
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              type="number"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddProduct}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

