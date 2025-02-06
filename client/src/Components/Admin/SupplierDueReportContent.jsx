import { Table } from "flowbite-react";

export default function SupplierDueReportContent() {
  return (
    <div className="overflow-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Supplier Due Report</h1>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Supplier</Table.HeadCell>
          <Table.HeadCell>Due Amount</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row>
            <Table.Cell>ABC Distributors</Table.Cell>
            <Table.Cell>$500</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
