export const COLUMN_SELECTION = {
  hospitalized: "hospitalized",
  severeCase: "severeCase",
  accomondation: "accomondation",
} as const

export type ColumnProperty = {
  column: typeof COLUMN_SELECTION[keyof typeof COLUMN_SELECTION]
  columnJP: string
  columnDescription: string
  currentPhase: string
  finalPhase: string
  indicators: {
    indicator: string
    indicatorJP: string
  }[]
}

export const COLUMN_PROPS: ColumnProperty[] = [
  {
    column: "hospitalized",
    columnJP: "入院患者",
    columnDescription:
      "入院者数(入院確定者数を含む) ÷ 確保病床数\n確保病床数とは: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
    currentPhase: "bedCurrentPhase",
    finalPhase: "bedFinalPhase",
    indicators: [
      {
        indicator: "bedUtilizationRate",
        indicatorJP: "入院患者の病床使用率",
      },
      {
        indicator: "hosipitalized",
        indicatorJP: "入院患者数",
      },
      {
        indicator: "bedCapacity",
        indicatorJP: "病床確保数",
      },
    ],
  },

  {
    column: "severeCase",
    columnJP: "重症入院患者",
    columnDescription:
      "重症入院患者数 ÷ 重症患者用の確保病床数\n重症患者用の確保病床数とは: 確保病床のうち重症患者用の病床数",
    currentPhase: "severeCaseBedCurrentPhase",
    finalPhase: "severeCaseBedFinalPhase",
    indicators: [
      {
        indicator: "severeCaseBedUtilizationRate",
        indicatorJP: "入院患者の病床使用率",
      },
      {
        indicator: "severeCase",
        indicatorJP: "入院患者数",
      },
      {
        indicator: "severeCaseBedCapacity",
        indicatorJP: "病床確保数",
      },
    ],
  },
  {
    column: "accomondation",
    columnJP: "療養患者",
    columnDescription:
      "宿泊療養者 ÷ 確保居室数\n確保居室数とは: 借り上げ/協定などで確保しているホテルなど宿泊施設の居室数",
    currentPhase: "accomondationCurrentPhase",
    finalPhase: "accomondationFinalPhase",
    indicators: [
      {
        indicator: "accomondationRoomUtilizationRate",
        indicatorJP: "入院患者の病床使用率",
      },
      { indicator: "accomondated", indicatorJP: "xxx" },
      { indicator: "accomondationRoomCapacity", indicatorJP: "xxx" },
    ],
  },
]
