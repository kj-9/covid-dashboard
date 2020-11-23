import React from "react"
import { css } from "@emotion/core"
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
    label: string
  }[]
}

export interface DashboardProps {
  className: string
  entityLabel: string
  indicatorLabel: string
  indicatorFormatter: ({ value }: { value: any }) => string
  trendLabel: string
  data: DashboardData[]
}

const DashboardCSS = css`
  table {
    margin-top: 1rem;
    margin-bottom: 1rem;

    /* header row */
    thead {
      tr:first-of-type {
        th {
          border-width: 3px 0 0;
        }
      }
      tr:nth-of-type(2) {
        th {
          text-align: center;
          padding-top: 0.1rem;
          font-size: 0.9rem;
        }
      }

      /* header column */
      tr {
        th:first-of-type,
        th:nth-of-type(3) {
          border-left-width: 2px;
        }

        th:nth-of-type(5) {
          border-right-width: 2px;
        }
      }

      tr:first-of-type {
        th:nth-of-type(3) {
          border-right-width: 2px;
        }
      }
    }

    tbody {
      /* body column */
      tr {
        td {
          border-bottom-width: 0.5px;
        }

        td:first-of-type,
        td:nth-of-type(2),
        td:nth-of-type(3) {
          border-left-width: 2px;
        }

        td:nth-of-type(5) {
          border-right-width: 2px;
        }
      }

      tr:last-of-type {
        td {
          border-bottom-width: 2px;
        }
      }
    }
  }
`

export const Dashboard = ({
  className,
  indicatorLabel,
  indicatorFormatter,
  trendLabel,
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
          Cell: ({ value }) => (
            <CellProgressBar
              value={value}
              range={1}
              label={`${indicatorFormatter({ value })}`}
            />
          ),
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
                label: element.label,
              }))}
              scale={{ x: "time" }}
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
    <div css={DashboardCSS}>
      <Table<DashboardData>
        className={className}
        columns={memoColumns}
        data={memoData}
      />
    </div>
  )
}
