import { useState } from "react"
import { Table, Button, Modal, TextInput } from "flowbite-react"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function CategoryContent() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [editingId, setEditingId] = useState(null) // Added state for editing

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory }])
      setShowModal(false)
      setNewCategory("")
    }
  }

  const handleEdit = (category) => {
    setNewCategory(category.name)
    setEditingId(category.id)
    setShowModal(true)
  }

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== categoryId))
    }
  }

  const handleSave = () => {
    if (editingId) {
      setCategories(categories.map((c) => (c.id === editingId ? { ...c, name: newCategory } : c)))
      setEditingId(null)
    } else {
      setCategories([...categories, { id: Date.now(), name: newCategory }])
    }
    setShowModal(false)
    setNewCategory("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Category Name</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {categories.map((category, index) => (
            <Table.Row key={category.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color="info" size="sm" onClick={() => handleEdit(category)}>
                    <FaEdit />
                  </Button>
                  <Button color="failure" size="sm" onClick={() => handleDelete(category.id)}>
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
          <FaPlus className="mr-2" /> Add Category
        </Button>
      </div>

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false)
          setNewCategory("")
          setEditingId(null)
        }}
      >
        <Modal.Header>Add/Edit Category</Modal.Header>
        <Modal.Body>
          <TextInput value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category Name" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
          <Button
            color="gray"
            onClick={() => {
              setShowModal(false)
              setNewCategory("")
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

