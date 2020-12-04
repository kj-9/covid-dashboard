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
