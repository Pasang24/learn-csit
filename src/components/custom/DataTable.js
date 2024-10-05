import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DataTable({ headData, cellData, caption = "" }) {
  return (
    <Table>
      <TableCaption className="caption-top text-base">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headData.map((head, index) => (
            <TableHead key={index}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cellData.map((data, index) => {
          const tableCells = Object.keys(data).map((cell) => (
            <TableCell key={data[cell]}>{data[cell]}</TableCell>
          ));

          return <TableRow key={index}>{tableCells}</TableRow>;
        })}
      </TableBody>
    </Table>
  );
}

export default DataTable;
