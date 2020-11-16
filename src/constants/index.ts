export const COLUMN_SELECTION = {
  pref_patients_beds_ratio: "pref_patients_beds_ratio",
  pref_heavy_patients_beds_ratio: "pref_heavy_patients_beds_ratio",
} as const

export type ColumnProperty = {
  column: typeof COLUMN_SELECTION[keyof typeof COLUMN_SELECTION]
  column_jp: string
  column_description: string
}

export const COLUMN_PROPERTIES: ColumnProperty[] = [
  {
    column: "pref_heavy_patients_beds_ratio",
    column_jp: "重症患者のベッド占有率",
    column_description: "重症者数/ベッド数",
  },
  {
    column: "pref_patients_beds_ratio",
    column_jp: "ベッド占有率",
    column_description: "患者数/ベッド数",
  },
]
