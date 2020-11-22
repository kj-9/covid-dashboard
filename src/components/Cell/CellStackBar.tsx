import React from "react"
import {
  VictoryStack,
  VictoryBar,
  VictoryContainer,
  VictoryTooltip,
} from "victory"
import { CellVictoryCommonProps, CellVictorydefaultProps } from "."
import { Cell } from "./Cell"

export interface CellStackBarProps extends CellVictoryCommonProps {
  data: {
    x: number
    y: number
    label?: string
    fill?: string
    strokeColor?: string
  }[]
  tooltipWidth?: number
}

export const CellStackBar: React.FC<CellStackBarProps> = ({
  width,
  height,
  padding,
  data,
  tooltipWidth,
}: CellStackBarProps) => {
  return (
    <Cell>
      <VictoryStack
        width={width}
        height={height}
        padding={padding}
        horizontal
        style={{
          data: {
            fill: ({ datum }) => datum?.fill,
            stroke: ({ datum }) => datum?.strokeColor,
            strokeWidth: 1,
          },
        }}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      >
        {data.map((element, index) => (
          <VictoryBar
            data={[element]}
            barRatio={1.3}
            key={index}
            labels={({ datum }) => datum?.label}
            labelComponent={
              element.label ? (
                <VictoryTooltip
                  style={{ fill: "white" }}
                  flyoutStyle={{ fill: "black" }}
                  flyoutWidth={tooltipWidth}
                  orientation="top"
                />
              ) : undefined
            }
          />
        ))}
      </VictoryStack>
    </Cell>
  )
}

CellStackBar.defaultProps = CellVictorydefaultProps
