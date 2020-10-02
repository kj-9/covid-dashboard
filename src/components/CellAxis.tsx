import React from "react"
import { VictoryAxis, VictoryContainer, VictoryAxisProps } from "victory"

export type CellAxisProps = Pick<
  VictoryAxisProps,
  "width" | "height" | "padding"
>

export const CellAxis: React.FC<CellAxisProps> = ({
  width = 120,
  height = 20,
  padding = { left: 10, right: 14 },
}) => {
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
}
