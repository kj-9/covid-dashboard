import React from "react"
import { VictoryAxis, VictoryContainer } from "victory"
import { CellVictoryCommonProps, CellVictorydefaultProps } from "./"
import { Cell } from "./Cell"

export type CellAxisProps = CellVictoryCommonProps

export const CellAxis: React.FC<CellAxisProps> = ({
  width,
  height,
  padding,
  tagProps,
}: CellAxisProps) => {
  return (
    <Cell
      tagType="th"
      className="pb-0"
      cssObject={{ verticalAlign: "bottom !important" }}
      tagProps={tagProps}
    >
      <VictoryAxis
        width={width}
        height={height}
        padding={padding}
        domain={{ y: [0, 1] }}
        orientation="top"
        offsetY={19}
        dependentAxis
        tickValues={[0, 0.5, 1]}
        tickFormat={t => `${100 * t}%`}
        style={{
          axis: { stroke: "transparent" },
          axisLabel: { color: "grey" },
          ticks: { size: 5, stroke: "gray" },
          tickLabels: { fontSize: 11, padding: 0, fill: "grey" },
          grid: { stroke: "transparent" },
        }}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      />
    </Cell>
  )
}

CellAxis.defaultProps = CellVictorydefaultProps
