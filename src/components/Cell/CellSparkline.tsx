import React from "react"
import {
  VictoryLine,
  VictoryLineProps,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
} from "victory"
import {
  CellVictoryCommonProps,
  DefaultContainerProps,
  DefaultTooltipProps,
} from "./"

import * as d3Array from "d3-array"

export interface CellSparklineProps
  extends CellVictoryCommonProps,
    Pick<VictoryLineProps, "scale" | "domain"> {
  tooltipWidth?: number
  data: { x: any; y: number; label?: string }[]
}

export const CellSparkline: React.FC<CellSparklineProps> = ({
  width,
  height,
  padding,
  domain,
  scale,
  data,
  tooltipWidth,
}: CellSparklineProps) => {
  // To show tooltip outside SVG

  const lastData = [
    data
      .sort((a, b) => d3Array.descending(a.x, b.x))
      .map(e => ({ x: e.x, y: e.y }))[0],
  ]

  return (
    <VictoryGroup
      width={width}
      height={height}
      padding={padding}
      domain={domain}
      scale={scale}
      containerComponent={
        <VictoryVoronoiContainer responsive={false} voronoiDimension="x" />
      }
    >
      <VictoryLine
        data={data}
        style={{
          data: {
            stroke: "lightgrey",
            strokeWidth: 1.2,
          },
        }}
        labelComponent={
          <VictoryTooltip {...DefaultTooltipProps} flyoutWidth={tooltipWidth} />
        }
      />
      <VictoryScatter
        data={lastData}
        style={{
          data: {
            fill: "lightgrey",
          },
        }}
      />
    </VictoryGroup>
  )
}

CellSparkline.defaultProps = DefaultContainerProps
