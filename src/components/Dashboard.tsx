import React from "react"
import { Cell } from "../components/Cell/Cell"
import { CellSparkline } from "../components/Cell/CellSparkline"
import { CellStatusBar } from "../components/Cell/CellStatusBar"
import { Table } from "./Table"
import { Column } from "react-table"
import { CellProgressBar } from "./Cell/CellProgressBar"

export interface DashboardData {
  entity: string
  phase: {
    current: number
    max: number
  }
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
  indicatorLabel,
  indicatorFormatter,
  trendLabel,
  trendTooltipFormatter,
  data,
}: DashboardProps): React.ReactElement => {
  const columns: Column<DashboardData>[] = [
    {
      Header: "都道府県",
      accessor: "entity",
      Cell: ({ value }) => (
        <Cell
          textAlign="right"
          cssObject={{
            whiteSpace: "nowrap",
            verticalAlign: "middle !important",
          }}
        >
          {value}
        </Cell>
      ),
      withoutCellTag: true,
    },
    {
      Header: "警戒レベル",
      accessor: "phase",
      id: "phaseStatusBar",
      Cell: ({ value }) => (
        <CellStatusBar
          current={value.current}
          max={value.max}
          label={`現在のレベル:${value.current}\n最大レベル:${value.max}`}
          tooltipWidth={100}
        />
      ),
      withoutCellTag: true,
    },

    {
      Header: indicatorLabel,
      columns: [
        {
          accessor: "indicator",
          Header: "現在",
          Cell: ({ value }) => <CellProgressBar value={value} range={1} />,
          withoutCellTag: true,
        },
        {
          id: "indicator_" + indicatorLabel,
          accessor: "indicator",
          Cell: ({ value }) => (
            <Cell
              textAlign="right"
              cssObject={{
                whiteSpace: "nowrap",
                verticalAlign: "middle !important",
              }}
            >
              {indicatorFormatter({ value })}
            </Cell>
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
