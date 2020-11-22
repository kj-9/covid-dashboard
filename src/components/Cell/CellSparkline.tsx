import React from "react"
import {
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryVoronoiContainerProps,
  VictoryLineProps,
  VictoryTooltip,
} from "victory"
import { CellVictoryCommonProps, CellVictorydefaultProps } from "./"
import { Cell } from "./Cell"

export interface CellSparklineProps
  extends CellVictoryCommonProps,
    Pick<VictoryVoronoiContainerProps, "labels">,
    Pick<VictoryLineProps, "scale" | "domain"> {
  data: { x: any; y: number }[]
}

export const CellSparkline: React.FC<CellSparklineProps> = ({
  width,
  height,
  padding,
  domain,
  scale,
  data,
  labels,
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

  return (
    <Cell tagProps={Object.assign(defaultTagCSS, tagProps)}>
      <VictoryLine
        width={width}
        height={height}
        padding={padding}
        domain={domain}
        scale={scale}
        style={{
          data: {
            stroke: "lightgrey",
            strokeWidth: 1.5,
          },
        }}
        data={data}
        containerComponent={
          <VictoryVoronoiContainer
            width={width}
            responsive={false}
            voronoiDimension="x"
            labels={labels}
            labelComponent={
              <VictoryTooltip
                style={{ fill: "white" }}
                flyoutStyle={{ fill: "black" }}
                flyoutPadding={{ left: 15, right: 15 }}
              />
            }
          />
        }
      />
    </Cell>
  )
}

CellSparkline.defaultProps = CellVictorydefaultProps
