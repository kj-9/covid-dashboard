import React, { useState, useEffect } from "react"
import { CellSparkline } from "../components/Cell/CellSparkline"
import { Table } from "./Table"
import { Column } from "react-table"
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
          label={`現在のレベル:${value.current}\n最大レベル:${value.max}`}
          modifier={getPhaseStatusModifier(value.current, value.max)}
        />
      ),
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
              modifier={indicator.barStyle}
            />
          ),
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
