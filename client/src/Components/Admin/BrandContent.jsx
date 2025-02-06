import { useState } from "react"
import { Table, Button, Modal, TextInput } from "flowbite-react"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function BrandContent() {
  const [brands, setBrands] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newBrand, setNewBrand] = useState("")
  const [editingId, setEditingId] = useState(null) // Added state for editing

  const handleAddBrand = () => {
    if (newBrand.trim()) {
      setBrands([...brands, { id: Date.now(), name: newBrand }])
      setShowModal(false)
      setNewBrand("")
    }
  }

  const handleEdit = (brand) => {
    setNewBrand(brand.name)
    setEditingId(brand.id)
    setShowModal(true)
  }

  const handleDelete = (brandId) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.filter((b) => b.id !== brandId))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setBrands(brands.map((b) => (b.id === editingId ? { ...b, name: newBrand } : b)))
      setEditingId(null)
    } else {
      setBrands([...brands, { id: Date.now(), name: newBrand }])
    }
    setShowModal(false)
    setNewBrand("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Brand Name</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {brands.map((brand, index) => (
            <Table.Row key={brand.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{brand.name}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color="info" size="sm" onClick={() => handleEdit(brand)}>
                    <FaEdit />
                  </Button>
                  <Button color="failure" size="sm" onClick={() => handleDelete(brand.id)}>
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
          <FaPlus className="mr-2" /> Add Brand
        </Button>
      </div>

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false)
          setNewBrand("")
          setEditingId(null)
        }}
      >
        <Modal.Header>Add/Edit Brand</Modal.Header>
        <Modal.Body>
          <TextInput value={newBrand} onChange={(e) => setNewBrand(e.target.value)} placeholder="Brand Name" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
          <Button
            color="gray"
            onClick={() => {
              setShowModal(false)
              setNewBrand("")
              setEditingId(null)
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

