import React from "react"
import { VictoryLine, VictoryContainer, VictoryLineProps } from "victory"
import { CellFC, CellFCDefault } from "./"

export interface CellSparklineProps
  extends Pick<
    VictoryLineProps,
    "width" | "height" | "padding" | "scale" | "domain"
  > {
  data: { x: any; y: number }[]
}

export const CellSparkline: CellFC<CellSparklineProps> = Object.assign(
  ({ width, height, padding, domain, scale, data }: CellSparklineProps) => {
    return (
      <td>
        <VictoryLine
          width={width}
          height={height}
          padding={padding}
          domain={domain}
          scale={scale}
          style={{
            data: {
              stroke: "grey",
              strokeWidth: 1,
            },
          }}
          data={data}
          containerComponent={
            <VictoryContainer width={width} responsive={false} />
          }
        />
      </td>
    )
  },
  CellFCDefault
)
