import { Table } from "flowbite-react";

export default function PurchaseReportContent() {
  const purchases = [
    { date: "2025-02-01", supplier: "ABC Supplies", product: "Laptops", quantity: 10, total: "$12,000" },
    { date: "2025-02-02", supplier: "Tech World", product: "Keyboards", quantity: 25, total: "$1,250" },
    { date: "2025-02-03", supplier: "Gadget Hub", product: "Monitors", quantity: 15, total: "$3,750" },
  ];

  return (
    <div className="overflow-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Purchase Report</h1>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Supplier</Table.HeadCell>
          <Table.HeadCell>Product</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Total Cost</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {purchases.map((purchase, index) => (
            <Table.Row key={index}>
              <Table.Cell>{purchase.date}</Table.Cell>
              <Table.Cell>{purchase.supplier}</Table.Cell>
              <Table.Cell>{purchase.product}</Table.Cell>
              <Table.Cell>{purchase.quantity}</Table.Cell>
              <Table.Cell>{purchase.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
