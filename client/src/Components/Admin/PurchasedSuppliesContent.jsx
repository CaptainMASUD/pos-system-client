import { useState } from "react"
import { Table, Button, Modal, TextInput, Select, Card } from "flowbite-react"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function PurchasedSuppliesContent() {
  const [purchases, setPurchases] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newPurchase, setNewPurchase] = useState({
    invoiceNo: "",
    supplier: "",
    date: "",
    amount: "",
    status: "pending",
    items: [],
  })

  const monthlyData = [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 2000 },
    // Add more monthly data
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h5 className="text-xl font-bold mb-2">Monthly Purchases</h5>
          <BarChart width={400} height={200} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#0891b2" />
          </BarChart>
        </Card>
        <Card>
          <h5 className="text-xl font-bold mb-2">Purchase Summary</h5>
          <div className="space-y-2">
            <p>Total Purchases: $12,000</p>
            <p>Pending Payments: $3,000</p>
            <p>This Month: $2,500</p>
          </div>
        </Card>
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Invoice No</Table.HeadCell>
          <Table.HeadCell>Supplier</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {purchases.map((purchase) => (
            <Table.Row key={purchase.invoiceNo}>
              <Table.Cell>{purchase.invoiceNo}</Table.Cell>
              <Table.Cell>{purchase.supplier}</Table.Cell>
              <Table.Cell>{purchase.date}</Table.Cell>
              <Table.Cell>${purchase.amount}</Table.Cell>
              <Table.Cell>
                <span
                  className={`px-2 py-1 rounded ${
                    purchase.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {purchase.status}
                </span>
              </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color="info" size="sm">
                    <FaEdit />
                  </Button>
                  <Button color="failure" size="sm">
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
          <FaPlus className="mr-2" /> Add Purchase
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Header>New Purchase Entry</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Invoice No" name="invoiceNo" placeholder="Enter invoice number" />
            <Select label="Supplier">
              <option>Select supplier</option>
              {/* Add supplier options */}
            </Select>
            <TextInput type="date" label="Date" name="date" />
            <TextInput type="number" label="Amount" name="amount" placeholder="Enter amount" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

