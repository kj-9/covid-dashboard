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
}: CellStatusBarProps) => {
  let currentColor = ""
  const currentRate = current / max

  if (currentRate <= 0.5) {
  } else if (currentRate < 1) {
    currentColor = " is-warning"
  } else {
    currentColor = " is-danger"
  }

  return (
    <div
      data-tooltip={label}
      css={{
        margin: "auto",
        width: 60,
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <progress
        className={"progress is-small" + currentColor}
        value={current}
        max={max}
      ></progress>
    </div>
  )
}
