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
    headerLabel: string
    formatter: (value: any) => string
    range?: number
    barStyle: string[]
  }[]
}

export const COLUMN_PROPS: ColumnProperty[] = [
  {
    column: "hospitalized",
    columnJP: "入院患者",
    columnDescription:
      "入院患者の病床使用率 = 入院者数(入院確定者数を含む) ÷ 確保病床数\n確保病床数とは: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
    currentPhase: "bedCurrentPhase",
    finalPhase: "bedFinalPhase",
    indicators: [
      {
        indicator: "bedUtilizationRate",
        headerLabel: "入院患者の病床使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "hosipitalized",
        headerLabel: "入院患者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "bedCapacity",
        headerLabel: "確保病床数",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },

  {
    column: "severeCase",
    columnJP: "重症入院患者",
    columnDescription:
      "重症入院患者の病床使用率 = 重症入院患者数 ÷ (重症患者用の)確保病床数\n確保病床数とは: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
    currentPhase: "severeCaseBedCurrentPhase",
    finalPhase: "severeCaseBedFinalPhase",
    indicators: [
      {
        indicator: "severeCaseBedUtilizationRate",
        headerLabel: "重症入院患者の病床使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "severeCase",
        headerLabel: "重症入院患者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "severeCaseBedCapacity",
        headerLabel: "確保病床数",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },
  {
    column: "accomondation",
    columnJP: "宿泊療養者",
    columnDescription:
      "宿泊療養者の居室使用率 = 宿泊療養者 ÷ 確保居室数\n確保居室数とは: 借り上げ/協定などで確保しているホテルなど宿泊施設の居室数",
    currentPhase: "accomondationCurrentPhase",
    finalPhase: "accomondationFinalPhase",
    indicators: [
      {
        indicator: "accomondationRoomUtilizationRate",
        headerLabel: "宿泊療養者の居室使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "accomondated",
        headerLabel: "宿泊療養者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "accomondationRoomCapacity",
        headerLabel: "確保居室数　  ",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },
]
