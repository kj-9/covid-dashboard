import React from "react"
import { CellStackBarProps } from "./CellStackBar"

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
}: CellProgressBarProps) => {
  return (
    <div
      css={{
        margin: "auto",
        width: 60,
        paddingLeft: 3,
        paddingRight: 3,
      }}
      data-tooltip={label}
    >
      <progress
        className="progress is-small is-light-invert"
        value={value}
        max={range}
      ></progress>
    </div>
  )
}
