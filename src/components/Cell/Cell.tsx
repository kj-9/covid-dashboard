import { CSSObject } from "@emotion/css"
import { cx, css } from "emotion"
import React from "react"

type tagType = "td" | "th"
type textAlignType = "center" | "justified" | "left" | "right"

export type CellProps = {
  tagType?: tagType
  textAlign?: textAlignType
  className?: string
  cssObject?: CSSObject
  props?: { className: never }
}

export const Cell: React.FC<CellProps> = ({
  tagType = "td",
  textAlign,
  className,
  cssObject,
  props,
  children,
}) => {
  let arrClassName: Array<string | undefined> = [className]
  if (textAlign) {
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
  }

  const joinedClassName: string | undefined =
    arrClassName.filter(Boolean).length === 0
      ? undefined
      : arrClassName.filter(Boolean).join(" ")

  let outProps: object

  if (joinedClassName && cssObject) {
    outProps = {
      className: cx(css(cssObject), joinedClassName),
      ...props,
      children: children,
    }
  } else if (joinedClassName && !cssObject) {
    outProps = {
      className: joinedClassName,
      ...props,
      children: children,
    }
  } else if (!joinedClassName && cssObject) {
    outProps = {
      className: cx(css(cssObject)),
      ...props,
      children: children,
    }
  } else {
    outProps = {
      ...props,
      children: children,
    }
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
