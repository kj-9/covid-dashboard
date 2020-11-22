import React from "react"
import { VictoryScatter, VictoryContainer } from "victory"
import {
  CellVictoryCommonProps,
  CellVictorydefaultProps,
  CellDefaultColorScale,
} from "./"
import { Cell } from "./Cell"

export interface CellTrafficLightProps extends CellVictoryCommonProps {
  max: number
  current: number
}

export const CellTrafficLight: React.FC<CellTrafficLightProps> = ({
  width,
  height,
  padding,
  max,
  current,
  tagProps,
}: CellTrafficLightProps) => {
  const input = [...Array(max).keys()].map(element => ({
    x: element,
    y: 1,
    fill:
      element + 1 <= current
        ? CellDefaultColorScale([1, max])(current)
        : "rgb(232,232,232)",
  }))

  return (
    <Cell tagProps={tagProps}>
      <VictoryScatter
        width={width}
        height={height}
        padding={padding}
        data={input}
        size={6}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      />
    </Cell>
  )
}

CellTrafficLight.defaultProps = CellVictorydefaultProps
