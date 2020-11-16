import React from "react"
import { Cell } from "../components/Cell/Cell"
import { CellAxis } from "../components/Cell/CellAxis"
import { CellBar } from "../components/Cell/CellBar"
import { CellSparkline } from "../components/Cell/CellSparkline"
import { Table } from "./Table"
import { Column } from "react-table"

export interface DashboardData {
  entity: string
  indicator: number
  trend: {
    date: Date
    indicator: number
  }[]
}

export interface DashboardProps {
  className: string
  entityLabel: string
  indicatorLabel: string
  indicatorFormatter: ({ value }: { value: any }) => string
  trendLabel: string
  trendTooltipFormatter: ({ datum }: { datum: any }) => string
  data: DashboardData[]
}

export const Dashboard = ({
  className,
  entityLabel,
  indicatorLabel,
  indicatorFormatter,
  trendLabel,
  trendTooltipFormatter,
  data,
}: DashboardProps): React.ReactElement => {
  const columns: Column<DashboardData>[] = [
    {
      Header: entityLabel,
      columns: [
        {
          accessor: "entity",
          Cell: ({ value }) => <Cell textAlign="right">{value}</Cell>,
          withoutCellTag: true,
        },
      ],
    },
    {
      Header: indicatorLabel,
      columns: [
        {
          accessor: "indicator",
          Header: CellAxis,
          withoutHeaderTag: true,
          Cell: CellBar,
          withoutCellTag: true,
        },
        {
          id: "indicator_" + indicatorLabel,
          accessor: "indicator",
          Cell: ({ value }) => (
            <Cell textAlign="right">{indicatorFormatter({ value })}</Cell>
          ),
          withoutCellTag: true,
        },
        {
          id: "trend_" + indicatorLabel,
          Header: trendLabel,
          accessor: "trend",
          Cell: ({ value }) => (
            <CellSparkline
              data={value.map(element => ({
                x: element.date,
                y: element.indicator,
              }))}
              labels={trendTooltipFormatter}
            />
          ),
          withoutCellTag: true,
        },
      ],
    },
  ]

  const memoColumns = React.useMemo(() => columns, [columns])
  const memoData = React.useMemo(() => data, [data])

  return (
    <Table<DashboardData>
      className={className}
      columns={memoColumns}
      data={memoData}
    />
  )
}
