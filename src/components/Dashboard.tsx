import React, { useState, useEffect, useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import { CellSparkline } from "../components/Cell/CellSparkline"
import { CellProgressBar } from "./Cell/CellProgressBar"
import style from "./Dashboard.module.scss"

import { timeFormat } from "d3-time-format"

const formatMD = timeFormat("%-m月%-d日")

export interface DashboardData {
  entity: string
  phase: {
    current: number
    max: number
    label: string
  }
  indicators: {
    indicator: {
      value: number
      label: string
    }
    trend: {
      date: Date
      value: number
      label: string
    }[]
  }[]
}

export interface DashboardProps {
  schema: {
    indicators: {
      headerLabel: string
      formatter: (value: any) => string
      range: number
      barStyle?: string[]
    }[]
    trendLabel: string
  }
  data: DashboardData[]
}

const getPhaseStatusModifier = (current: number, max: number) => {
  const currentRate = current / max

  if (currentRate <= 0.5) {
  } else if (currentRate < 1) {
    return "isWarning"
  } else {
    return "isDanger"
  }
}

export const Dashboard = ({
  schema,
  data,
}: DashboardProps): React.ReactElement => {
  const [isRendering, setIsRendering] = useState<boolean | null>(null)
  const [prevData, setPrevData] = useState<DashboardData[] | null>(null)

  // Set state if data is changed
  if (data !== prevData) {
    setIsRendering(true)
    setPrevData(data)
  }

  // set isRendering after rendering
  useEffect(() => {
    const id = setTimeout(() => setIsRendering(false), 1)

    return () => clearTimeout(id)
  })

  // Can not use useMemo inside useMemo. so declare here.
  const sortType = useMemo(
    () => (rowA, rowB) => {
      const valueA = rowA.values.phaseStatusBar
      const ratioA = valueA.current / valueA.max

      const valueB = rowB.values.phaseStatusBar
      const ratioB = valueB.current / valueB.max

      if (ratioA === ratioB) return 0

      return ratioA > ratioB ? 1 : -1
    },
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: "都道府県",
        accessor: "entity",
      },
      {
        Header: "警戒レベル",
        accessor: "phase",
        id: "phaseStatusBar",
        Cell: ({ value }) => (
          <CellProgressBar
            value={value.current}
            range={value.max}
            label={`現在のレベル:${value.current}\n最大レベル:${value.max}`}
            modifiers={[getPhaseStatusModifier(value.current, value.max)]}
          />
        ),
        sortType,
      },
      ...schema.indicators.map((indicator, index) => ({
        Header: indicator.headerLabel,
        columns: [
          {
            id: `indicator_bar_${index}`,
            accessor: `indicators[${index}].indicator`,
            Header: "現在",
            Cell: ({ value }) => (
              <CellProgressBar
                value={value}
                range={indicator.range}
                modifiers={indicator.barStyle}
              />
            ),
            sortType: "basic",
          },
          {
            id: `indicator_label_${index}`,
            accessor: `indicators[${index}].indicator`,
            Cell: ({ value }) => indicator.formatter(value),
          },
          {
            id: `trend_sparkline_${index}`,
            Header: schema.trendLabel,
            accessor: `indicators[${index}].trend`,
            Cell: ({ value }) => (
              <CellSparkline
                data={value.map(element => ({
                  x: element.date,
                  y: element.value,
                  label: `${formatMD(
                    new Date(element.date)
                  )}時点\n${indicator.formatter(element.value)}`,
                }))}
                scale={{ x: "time" }}
              />
            ),
          },
        ],
      })),
    ],
    [schema]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<DashboardData>(
    {
      columns,
      data: useMemo(() => data, [data]),
      initialState: useMemo(
        () => ({
          sortBy: [
            {
              id: "indicator_bar_0",
              desc: true,
            },
            {
              id: "phaseStatusBar",
              desc: true,
            },
          ],
        }),
        []
      ),
    },
    useSortBy
  )

  if (isRendering) {
    return (
      <div className="mt-2">
        <button className="button is-loading">Loading</button>
      </div>
    )
  }

  return (
    <div className={style.Dashboard}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
