import React from "react"
import { useTable, TableOptions } from "react-table"

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
  } = useTable<T>({ columns, data })

  return (
    <table {...getTableProps()} className={className}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              if (column.withoutHeaderTag) {
                const { key, ...tagProps } = column.getHeaderProps()
                return column.render("Header", { key, tagProps })
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
                if (cell.column.withoutCellTag) {
                  const { key, ...tagProps } = cell.getCellProps()
                  return cell.render("Cell", { key, tagProps })
                } else {
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
