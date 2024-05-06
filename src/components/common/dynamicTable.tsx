import { ReactNode } from "react";
import { useTable, Column } from "react-table";

interface DynamicTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
}

export default function DynamicTable<T extends object>({
  data,
  columns,
}: DynamicTableProps<T>) {
  const tableInstance = useTable<T>({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="max-w-[90vw] max-h-[550px] overflow-auto font-light">
      <table {...getTableProps()}>
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            // @ts-ignore
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  // @ts-ignore
                  key={column.id}
                  {...column.getHeaderProps({
                    className:
                      "h-[50px] text-[#eaeeff] bg-[linear-gradient(to_right,#222,#000,#333)]",
                  })}
                >
                  {column.render("Header") as ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                // @ts-ignore
                key={row.id}
                {...row.getRowProps({
                  className:
                    "h-[50px] odd:text-gray-50 even:text-gray-800 odd:bg-[rgba(75,75,75,0.8)] even:bg-[rgba(175,175,175,0.5)]",
                })}
              >
                {row.cells.map((cell) => (
                  <td
                    // @ts-ignore
                    key={cell.row.id}
                    {...cell.getCellProps({
                      className: "p-[5px] text-center",
                    })}
                  >
                    {cell.render("Cell") as ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
