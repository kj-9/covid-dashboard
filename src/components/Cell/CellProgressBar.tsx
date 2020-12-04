import React from "react"
import style from "./CellProgressBar.module.scss"

console.log(style)
export interface CellProgressBarProps {
  value: number
  range: number
  modifier?: string
  label?: string
}

export const CellProgressBar: React.FC<CellProgressBarProps> = ({
  value,
  range,
  label,
  modifier,
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
        className={[style.progress, style.isSmall, style[modifier]].join(" ")}
        value={value}
        max={range}
      ></progress>
    </div>
  )
}
