import { VictoryCommonProps } from "victory-core"
export interface CellVictoryCommonProps
  extends Pick<VictoryCommonProps, "width" | "height" | "padding"> {}

export const DefaultContainerProps = {
  width: 80,
  height: 25,
  padding: { top: 5, bottom: 5, left: 10, right: 14 },
}

export const DefaultTooltipProps = {
  style: { fill: "white" },
  flyoutStyle: { fill: "black" },
  flyoutPadding: { left: 15, right: 15 },
}

import * as scale from "d3-scale"

export const CellDefaultColorScale = (
  domain: Iterable<scale.NumberValue> = [0, 1]
) => {
  const colorRange = ["#e5e7d4", "#ffe570", "#ffa94c", "#ff845f", "#ff0000"]

  return (value: number) => {
    return scale.scaleQuantize<string>().domain(domain).range(colorRange)(value)
  }
}
