import React from "react"
import { VictoryAxis, VictoryContainer, VictoryAxisProps } from "victory"
import { CellFC, CellFCDefault } from "./"

export type CellAxisProps = Pick<
  VictoryAxisProps,
  "width" | "height" | "padding"
>

export const CellAxis: CellFC<CellAxisProps> = Object.assign(
  ({ width, height, padding }: CellAxisProps) => {
    return (
      <th className="pb-0" css={{ verticalAlign: "bottom !important" }}>
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
      </th>
    )
  },
  CellFCDefault
)
