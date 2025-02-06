import { useState } from "react"
import { Table, Button, Modal, TextInput, Select, Card } from "flowbite-react"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function PaidSuppliesContent() {
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newPayment, setNewPayment] = useState({
    paymentId: "",
    supplier: "",
    date: "",
    amount: "",
    method: "cash",
  })

  const paymentData = [
    { month: "Jan", payments: 3000 },
    { month: "Feb", payments: 4000 },
    { month: "Mar", payments: 3500 },
    // Add more payment data
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h5 className="text-xl font-bold mb-2">Payment History</h5>
          <LineChart width={400} height={200} data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="payments" stroke="#0891b2" />
          </LineChart>
        </Card>
        <Card>
          <h5 className="text-xl font-bold mb-2">Payment Summary</h5>
          <div className="space-y-2">
            <p>Total Paid: $10,500</p>
            <p>This Month: $3,500</p>
            <p>Outstanding: $1,500</p>
          </div>
        </Card>
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Payment ID</Table.HeadCell>
          <Table.HeadCell>Supplier</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Method</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {payments.map((payment) => (
            <Table.Row key={payment.paymentId}>
              <Table.Cell>{payment.paymentId}</Table.Cell>
              <Table.Cell>{payment.supplier}</Table.Cell>
              <Table.Cell>{payment.date}</Table.Cell>
              <Table.Cell>${payment.amount}</Table.Cell>
              <Table.Cell>{payment.method}</Table.Cell>
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
          <FaPlus className="mr-2" /> Add Payment
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>New Payment Entry</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Select label="Supplier">
              <option>Select supplier</option>
              {/* Add supplier options */}
            </Select>
            <TextInput type="date" label="Date" name="date" />
            <TextInput type="number" label="Amount" name="amount" placeholder="Enter amount" />
            <Select label="Payment Method">
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="check">Check</option>
            </Select>
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

