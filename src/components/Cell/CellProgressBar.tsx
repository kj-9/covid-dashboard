import React from "react"
import style from "./CellProgressBar.module.scss"

export interface CellProgressBarProps {
  value: number
  range: number
  modifiers?: (string | undefined)[]
  label?: string
}

export const CellProgressBar: React.FC<CellProgressBarProps> = ({
  value,
  range,
  label,
  modifiers,
}) => {
  const className = [style.progress, style.isSmall]
    .concat(modifiers?.map(e => style[e]))
    .join(" ")

  console.log(modifiers?.map(e => style[e]))
  console.log(style[modifiers])

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
      <progress className={className} value={value} max={range}></progress>
    </div>
  )
}
