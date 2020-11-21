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
    column_jp: "入院者病床使用率",
    column_description: "患者数数/ベッド数",
  },
  {
    column: "severeCaseBedUtilizationRate",
    column_jp: "重症者病床使用率",
    column_description: "重症患者数/ベッド数",
  },
  {
    column: "accomondationRoomUtilizationRate",
    column_jp: "宿泊療養居室使用率",
    column_description: "療養者数/ベッド数",
  },
]
