import React from "react"
import { VictoryBar, VictoryContainer, VictoryBarProps } from "victory"
import * as scale from "d3-scale"

export interface CellBarProps
  extends Pick<VictoryBarProps, "width" | "height" | "padding"> {
  value: number
}

export const CellBar: React.FC<CellBarProps> = ({
  width = 120,
  height = 20,
  padding = { left: 10, right: 14 },
  value,
}) => {
  const scaledValue = scale
    .scaleThreshold()
    .domain([0, 0.25, 0.5, 0.75, 1])
    .range([0, 0.25, 0.5, 0.75, 1])(value)

  const colorRange = ["#ffffff", "#ffa815", "#ff3939", "#a52323"]
  const colorScale = scale.scaleLinear().range(colorRange).domain([0, 1])(
    scaledValue
  )

  return (
    <td>
      <VictoryBar
        width={width}
        height={height}
        padding={padding}
        domain={{ y: [0, 1] }}
        data={[{ x: "value", y: value }]}
        barRatio={1}
        horizontal
        alignment={"middle"}
        style={{
          data: {
            fill: colorScale,
          },
        }}
        containerComponent={
          <VictoryContainer width={width} responsive={false} />
        }
      />
    </td>
  )
}
