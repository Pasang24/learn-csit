import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DataTable({ cellData, caption }) {
  return (
    <Table>
      <TableCaption className="caption-top text-base">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Course Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cellData.map((data, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.code}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DataTable;
