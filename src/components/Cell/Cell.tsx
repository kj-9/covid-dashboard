import React from "react"

type tagType = "td" | "th"
type textAlignType = "center" | "justified" | "left" | "right"

export type CellProps = {
  tagType: tagType
  textAlign: textAlignType
  props: object
}

export const Cell: React.FC<CellProps> = ({
  tagType = "td",
  textAlign,
  props,
  children,
}) => {
  let className
  switch (textAlign) {
    case "center":
      className = "has-text-centered"
      break
    case "justified":
      className = "has-text-justified"
      break
    case "left":
      className = "has-text-left"
      break
    case "right":
      className = "has-text-right"
      break
    default:
      undefined
  }

  return React.createElement(tagType, {
    className: className,
    ...props,
    children: children,
  })
}
