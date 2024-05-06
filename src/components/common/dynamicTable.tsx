import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTable, Column } from "react-table";

interface DynamicTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

export default function DynamicTable<T extends object>({
  data,
  columns,
  selectedId,
  setSelectedId,
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
                  className: `h-[50px] ${
                    selectedId === row.cells[0].value
                      ? "text-[rgb(136,112,237)] bg-[rgba(136,112,237,0.4)]"
                      : "odd:text-gray-50 even:text-gray-800 odd:bg-[rgba(75,75,75,0.8)] even:bg-[rgba(175,175,175,0.5)] hover:bg-[rgba(136,112,237,0.9)]"
                  } duration-[.3s] cursor-pointer`,
                })}
              >
                {row.cells.map((cell) => (
                  <td
                    // @ts-ignore
                    key={cell.row.id}
                    {...cell.getCellProps({
                      className: "p-[5px] text-center",
                    })}
                    onClick={() => {
                      cell.column.id !== "checkbox" &&
                        setSelectedId(cell.row.allCells[0].value);
                    }}
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
