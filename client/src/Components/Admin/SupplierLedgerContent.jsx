import { Table } from "flowbite-react";

export default function SupplierLedgerContent() {
  return (
    <div className="overflow-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Supplier Ledger</h1>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Supplier</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row>
            <Table.Cell>2025-02-01</Table.Cell>
            <Table.Cell>XYZ Supplies</Table.Cell>
            <Table.Cell>$1,000</Table.Cell>
            <Table.Cell>Paid</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
