import React, { useState, useEffect } from "react"
import { CellSparkline } from "../components/Cell/CellSparkline"
import { Table } from "./Table"
import { Column } from "react-table"
import { CellProgressBar } from "./Cell/CellProgressBar"
import style from "./Dashboard.module.scss"
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
  header: {
    entity: string
    indicator: string
    trend: string
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
  header,
  data,
}: DashboardProps): React.ReactElement => {
  const [isRendering, setIsRendering] = useState(true)
  const [prevData, setPrevData] = useState(data)

  if (data !== prevData) {
    setIsRendering(true)
    setPrevData(data)
  }

  useEffect(() => {
    const id = setTimeout(() => setIsRendering(false), 1)

    return () => clearTimeout(id)
  })

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
        <CellProgressBar
          value={value.current}
          range={value.max}
          label={value.label}
          modifier={getPhaseStatusModifier(value.current, value.max)}
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
            <CellProgressBar value={value.value} range={1} />
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

  const memoColumns = React.useMemo(() => columns, [
    columns,
    isRendering,
    prevData,
  ])
  const memoData = React.useMemo(() => data, [data, isRendering, prevData])

  if (isRendering) {
    return (
      <div className="mt-2">
        <button className="button is-loading">Loading</button>
      </div>
    )
  }

  return (
    <div className={style.Dashboard}>
      <Table<DashboardData> columns={memoColumns} data={memoData} />
    </div>
  )
}
