import React from "react"
import { CellStackBar, CellStackBarProps } from "./CellStackBar"

export interface CellStatusBarProps
  extends Pick<CellStackBarProps, "tooltipWidth"> {
  max: number
  current: number
  label?: string
}

export const CellStatusBar: React.FC<CellStatusBarProps> = ({
  max,
  current,
  label,
  tooltipWidth,
}: CellStatusBarProps) => {
  const strokeColor = "lightgrey"
  const spaceColor = "white"
  let currentColor: string

  const currentRate = current / max

  if (currentRate <= 0.5) {
    currentColor = "lightgrey"
  } else if (currentRate < 1) {
    currentColor = "hsl(48, 100%, 67%)"
  } else {
    currentColor = "hsl(348, 100%, 61%)"
  }

  const inputData = [...Array(max).keys()].map(element => ({
    x: 1,
    y: 1,
    fill: element + 1 <= current ? currentColor : spaceColor,
    label: element + 1 === current ? label : undefined,
    strokeColor: element + 1 <= current ? currentColor : strokeColor,
  }))

  return <CellStackBar data={inputData} tooltipWidth={tooltipWidth} />
}
