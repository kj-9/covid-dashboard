import React from "react"
import { css } from "@emotion/core"
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
    label: string
  }
  indicator: {
    value: number
    label: string
  }
  trend: {
    date: Date
    value: number
    label: string
  }[]
}

export interface DashboardProps {
  className: string
  header: {
    entity: string
    indicator: string
    trend: string
  }
  data: DashboardData[]
}

const DashboardCSS = css`
  table {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    white-space: nowrap;

    td {
      vertical-align: middle;
      border-bottom-width: 0;
      padding: 0.3rem;
      color: grey;
    }

    th {
      font-weight: 500;
    }

    tr {
      td {
        text-align: right;
      }

      /* vertical border */

      th:first-of-type,
      td:first-of-type {
        border-left-width: 2px;
      }

      th:nth-of-type(3),
      td:nth-of-type(2),
      td:nth-of-type(3) {
        border-left-width: 1px;
      }

      th:last-of-type,
      td:last-of-type {
        border-right-width: 2px;
      }

      /* last horizontal border */
      :last-of-type {
        td {
          border-bottom-width: 1px;
        }
      }
    }

    thead {
      tr {
        /* header specific border */
        :first-of-type th {
          border-top-width: 2px;
          border-bottom-width: 0;
        }
        /* style in nested header */
        :last-of-type th {
          text-align: center;
          padding-top: 0.1rem;
        }
      }
    }
  }
`

export const Dashboard = ({
  className,
  header,
  data,
}: DashboardProps): React.ReactElement => {
  const columns: Column<DashboardData>[] = [
    {
      Header: "都道府県",
      accessor: "entity",
    },
    {
      Header: "警戒レベル",
      accessor: "phase",
      id: "phaseStatusBar",
      Cell: ({ value }) => (
        <CellStatusBar
          current={value.current}
          max={value.max}
          label={value.label}
          tooltipWidth={100}
        />
      ),
    },

    {
      Header: header.indicator,
      columns: [
        {
          id: "indicator_bar",
          accessor: "indicator",
          Header: "現在",
          Cell: ({ value }) => (
            <CellProgressBar
              value={value.value}
              range={1}
              label={value.label}
            />
          ),
        },
        {
          id: "indicator_label",
          accessor: "indicator",
          Cell: ({ value }) => value.label,
        },
        {
          id: "trend_sparkline",
          Header: header.trend,
          accessor: "trend",
          Cell: ({ value }) => (
            <CellSparkline
              data={value.map(element => ({
                x: element.date,
                y: element.value,
                label: element.label,
              }))}
              scale={{ x: "time" }}
            />
          ),
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
