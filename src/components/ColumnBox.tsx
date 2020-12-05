import React from "react"

export interface ColumnBoxProps {
  heading: string
  columnModifier?: string[]
  boxModifier?: string[]
}

export const ColumnBox: React.FC<ColumnBoxProps> = ({
  heading,
  columnModifier = [],
  boxModifier = ["has-background-grey-lighter"],
  children,
}) => {
  const columnClassNames = ["column"].concat(columnModifier).join(" ")
  const boxClassNames = ["box"].concat(boxModifier).join(" ")

  return (
    <div className={columnClassNames}>
      <div className={boxClassNames} css={{ height: "100%" }}>
        <div className="heading">
          <span className="tag is-info is-light is-medium">{heading}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
