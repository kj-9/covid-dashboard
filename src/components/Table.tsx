import React from "react"
import { useTable, TableOptions, Column } from "react-table"
import { CellFC } from "./Cell"

interface TableProps<T extends object = {}> extends TableOptions<T> {
  className: string
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
              if ((column.Header as CellFC<any>)?.kind == "CELL") {
                return column.render("Header")
              } else {
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                )
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
                if ((cell.column.Cell as CellFC<any>)?.kind == "CELL") {
                  console.log(cell)
                  return cell.render("Cell")
                } else {
                  console.log(cell)
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
