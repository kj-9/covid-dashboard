import React from "react"
import { CellStackBar, CellStackBarProps } from "./CellStackBar"

export interface CellProgressBarProps extends CellStackBarProps {
  value: number
  range: number
  label?: string
  tooltipWidth?: number
}

export const CellProgressBar: React.FC<CellProgressBarProps> = ({
  value,
  range,
  label,
  tooltipWidth,
}: CellProgressBarProps) => {
  const spaceColor = "#F0F0F0"
  const valueColor = "lightgrey"
  const inputData = [
    {
      x: 1,
      y: value,
      fill: valueColor,
      label: label,
    },
    {
      x: 1,
      y: range - value,
      fill: spaceColor,
    },
  ]

  return <CellStackBar data={inputData} tooltipWidth={tooltipWidth} />
}
