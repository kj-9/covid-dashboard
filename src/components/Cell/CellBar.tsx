import React from "react"
import { VictoryBar, VictoryContainer } from "victory"
import {
  CellVictoryCommonProps,
  CellVictorydefaultProps,
  CellDefaultColorScale,
} from "./"
import { Cell } from "./Cell"

export interface CellBarProps extends CellVictoryCommonProps {
  domainY: [number, number]
  value: number
}

export const CellBar: React.FC<CellBarProps> = ({
  width,
  height,
  padding,
  domainY = [0, 1],
  value,
  tagProps,
}: CellBarProps) => {
  return (
    <Cell tagProps={tagProps}>
      <VictoryBar
        width={width}
        height={height}
        padding={padding}
        style={{
          data: {
            fill: CellDefaultColorScale(domainY)(value),
          },
        }}
        domain={{ y: domainY }}
        data={[{ x: "value", y: value }]}
        barRatio={1}
        horizontal
        alignment={"middle"}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      />
    </Cell>
  )
}

CellBar.defaultProps = CellVictorydefaultProps
