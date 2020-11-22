import React from "react"
import { CellStackBar, CellStackBarProps } from "./CellStackBar"

export interface CellProgressBarProps
  extends Pick<CellStackBarProps, "tooltipWidth"> {
  value: number
  range: number
  label?: string
}

export const CellProgressBar: React.FC<CellProgressBarProps> = ({
  value,
  range,
  label,
  tooltipWidth,
}: CellProgressBarProps) => {
  const strokeColor = "lightgrey"
  const spaceColor = "white"
  const valueColor = "lightgrey"
  const inputData = [
    {
      x: 1,
      y: value,
      fill: valueColor,
      strokeColor: strokeColor,
      label: label,
    },
    {
      x: 1,
      y: range - value,
      strokeColor: strokeColor,
      fill: spaceColor,
    },
  ]

  return <CellStackBar data={inputData} tooltipWidth={tooltipWidth} />
}
