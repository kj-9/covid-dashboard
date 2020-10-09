import React from "react"
import { VictoryLine, VictoryContainer, VictoryLineProps } from "victory"
import { CellDefaultArg } from "./"

export interface CellSparklineProps
  extends Pick<
    VictoryLineProps,
    "width" | "height" | "padding" | "scale" | "domain"
  > {
  data: { x: any; y: number }[]
}

export const CellSparkline: React.FC<CellSparklineProps> = ({
  width,
  height,
  padding,
  domain,
  scale,
  data,
}) => {
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
}

CellSparkline.defaultProps = CellDefaultArg