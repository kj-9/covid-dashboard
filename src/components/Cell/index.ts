import { VictoryCommonProps } from "victory-core"
import { CellProps } from "./Cell"

export interface CellVictoryCommonProps
  extends Pick<VictoryCommonProps, "width" | "height" | "padding">,
    Pick<CellProps, "tagProps"> {}

export const CellVictorydefaultProps = {
  width: 120,
  height: 20,
  padding: { left: 10, right: 14 },
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
