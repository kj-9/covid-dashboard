import React from "react"
import { useTable, TableOptions } from "react-table"

interface TableProps<T extends object = {}> extends TableOptions<T> {
  className: string
}

const doWrapTag = (HeaderOrCell: any) => {
  return (
    typeof HeaderOrCell === "string" ||
    (typeof HeaderOrCell === "function" &&
      (HeaderOrCell.name === "emptyRenderer" ||
        HeaderOrCell.name === "defaultRenderer"))
  )
}

export const Table = <T extends object>({
  columns,
  data,
  className,
}: TableProps<T>): React.ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} className={className}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              if (doWrapTag(column.Header)) {
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                )
              } else {
                return column.render("Header")
              }
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (doWrapTag(cell.column.Cell)) {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                } else {
                  return cell.render("Cell")
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
