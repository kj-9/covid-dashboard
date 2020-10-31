import React from "react"
import { VictoryBar, VictoryContainer, VictoryBarProps } from "victory"
import { CelldefaultProps, CellDefaultColorScale } from "./"
import { Cell } from "./Cell"

export interface CellVerticalBarProps
  extends Pick<
    VictoryBarProps,
    "width" | "height" | "padding" | "domain" | "scale"
  > {
  data: { x: number; y: number }[]
}

export const CellVerticalBar: React.FC<CellVerticalBarProps> = ({
  width,
  height,
  padding,
  domain,
  scale,
  data,
}: CellVerticalBarProps) => {
  return (
    <Cell>
      <VictoryBar
        width={width}
        height={height}
        padding={padding}
        domain={domain}
        scale={scale}
        style={{
          data: {
            fill: "grey",
          },
        }}
        data={data}
        barRatio={1}
        alignment={"middle"}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      />
    </Cell>
  )
}
CellVerticalBar.defaultProps = CelldefaultProps
