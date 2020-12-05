import React from "react"

export interface ColumnBoxProps {
  heading: string
  boxModifier?: string[]
}

export const ColumnBox: React.FC<ColumnBoxProps> = ({
  heading,
  boxModifier = ["has-background-grey-lighter"],
  children,
}) => {
  const boxClassNames = ["box"].concat(boxModifier).join(" ")

  return (
    <div className="column">
      <div className={boxClassNames} css={{ height: "100%" }}>
        <div className="heading">
          <span className="tag is-info is-light is-medium">{heading}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
