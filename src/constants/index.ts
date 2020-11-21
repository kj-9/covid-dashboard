export const COLUMN_SELECTION = {
  bedUtilizationRate: "bedUtilizationRate",
  severeCaseBedUtilizationRate: "severeCaseBedUtilizationRate",
  accomondationRoomUtilizationRate: "accomondationRoomUtilizationRate",
} as const

export type ColumnProperty = {
  column: typeof COLUMN_SELECTION[keyof typeof COLUMN_SELECTION]
  column_jp: string
  column_description: string
}

export const COLUMN_PROPERTIES: ColumnProperty[] = [
  {
    column: "bedUtilizationRate",
    column_jp: "入院患者の病床使用率",
    column_description:
      "入院者数(入院確定者数を含む) ÷ 確保病床数\n確保病床数: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
  },
  {
    column: "severeCaseBedUtilizationRate",
    column_jp: "重症患者の病床使用率",
    column_description:
      "入院者のうち、重症患者数 ÷ 重症患者用の確保病床数\n重症患者用の確保病床数: 確保病床のうち重症患者用の病床数",
  },
  {
    column: "accomondationRoomUtilizationRate",
    column_jp: "宿泊療養者の居室使用率",
    column_description:
      "宿泊療養者 ÷ 確保居室数\n確保居室数: 借り上げ/協定等などで確保している居室数",
  },
]
