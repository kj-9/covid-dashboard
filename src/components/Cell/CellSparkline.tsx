import React from "react"
import {
  VictoryLine,
  VictoryLineProps,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
} from "victory"
import { CellVictoryCommonProps, CellVictorydefaultProps } from "./"
import { Cell } from "./Cell"

export interface CellSparklineProps
  extends CellVictoryCommonProps,
    Pick<VictoryLineProps, "scale" | "domain"> {
  data: { x: any; y: number; label?: string }[]
}

export const CellSparkline: React.FC<CellSparklineProps> = ({
  width,
  height,
  padding,
  domain,
  scale,
  data,
  tagProps,
}: CellSparklineProps) => {
  // To show tooltip outside SVG
  const defaultTagCSS = {
    css: {
      svg: {
        overflow: "visible",
      },
    },
  }

  const lastData = [data.map(e => ({ x: e.x, y: e.y }))[data.length - 1]]

  return (
    <Cell tagProps={Object.assign(defaultTagCSS, tagProps)}>
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
              strokeWidth: 1.5,
            },
          }}
          labelComponent={
            <VictoryTooltip
              style={{ fill: "white" }}
              flyoutStyle={{ fill: "black" }}
              flyoutPadding={{ left: 15, right: 15 }}
            />
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
    </Cell>
  )
}

CellSparkline.defaultProps = CellVictorydefaultProps
