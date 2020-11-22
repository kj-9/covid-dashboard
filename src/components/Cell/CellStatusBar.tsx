import React from "react"
import { CellStackBar, CellStackBarProps } from "./CellStackBar"

export interface CellStatusBarProps extends CellStackBarProps {
  max: number
  current: number
  label: string
  tooltipWidth: number
}

export const CellStatusBar: React.FC<CellStatusBarProps> = ({
  max,
  current,
  label,
  tooltipWidth,
}: CellStatusBarProps) => {
  const strokeColor = "lightgrey"
  const spaceColor = "white"
  const currentColor = "lightgrey"
  const inputData = [...Array(max).keys()].map(element => ({
    x: 1,
    y: 1,
    fill: element + 1 === current ? currentColor : spaceColor,
    label: element + 1 === current ? label : undefined,
    strokeColor: strokeColor,
  }))

  return <CellStackBar data={inputData} tooltipWidth={tooltipWidth} />
}
