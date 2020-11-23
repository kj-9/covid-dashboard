import { cx, css, CSSObject } from "@emotion/css"
import React from "react"

type tagType = "td" | "th"
type textAlignType = "center" | "justified" | "left" | "right"

export type CellProps = {
  tagType?: tagType
  textAlign?: textAlignType
  className?: string
  cssObject?: CSSObject
  tagProps?: { className: never }
}

export const Cell: React.FC<CellProps> = ({
  tagType = "td",
  textAlign,
  className,
  cssObject,
  children,
  tagProps,
}) => {
  let arrClassName: Array<string | undefined> = [className]

  switch (textAlign) {
    case "center":
      arrClassName.push("has-text-centered")
      break
    case "justified":
      arrClassName.push("has-text-justified")
      break
    case "left":
      arrClassName.push("has-text-left")
      break
    case "right":
      arrClassName.push("has-text-right")
      break
    case undefined:
      break
    default:
      throw Error("unkown textAlign: " + textAlign)
  }

  const joinedClassName: string | undefined =
    arrClassName.filter(Boolean).length === 0
      ? undefined
      : arrClassName.filter(Boolean).join(" ")

  let outProps: object = { children: children, ...tagProps }

  if (joinedClassName && cssObject) {
    outProps = Object.assign(outProps, {
      className: cx(css(cssObject), joinedClassName),
    })
  } else if (joinedClassName && !cssObject) {
    outProps = Object.assign(outProps, {
      className: joinedClassName,
    })
  } else if (!joinedClassName && cssObject) {
    outProps = Object.assign(outProps, {
      className: cx(css(cssObject)),
    })
  }

  switch (tagType) {
    case "td":
      return <td {...outProps}>{children}</td>
    case "th":
      return <th {...outProps}>{children}</th>
    default:
      throw Error("unkown tagType: " + tagType)
  }
}
