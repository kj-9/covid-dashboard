type indicator =
  | "prefJP"
  | "date"
  | "hospitalizedCases"
  | "hospitalizedCasesPhase"
  | "hospitalizedCasesMaxPhase"
  | "hospitalizedCasesCap"
  | "hospitalizedCasesUTE"
  | "severeCases"
  | "severeCasesPhase"
  | "severeCasesMaxPhase"
  | "severeCasesCap"
  | "severeCasesUTE"
  | "atHotelCases"
  | "atHotelCasesPhase"
  | "atHotelCasesMaxPhase"
  | "atHotelCasesCap"
  | "atHotelCasesUTE"

export const COLUMN_SELECTION = {
  hospitalizedCases: "hospitalizedCases",
  severeCases: "severeCases",
  atHotelCases: "atHotelCases",
} as const

export type ColumnProperty = {
  column: typeof COLUMN_SELECTION[keyof typeof COLUMN_SELECTION]
  columnJP: string
  columnDescription: string
  currentPhase: indicator
  finalPhase: indicator
  indicators: {
    indicator: indicator
    headerLabel: string
    formatter: (value: any) => string
    range?: number
    barStyle: string[]
  }[]
}

export const COLUMN_PROPS: ColumnProperty[] = [
  {
    column: "hospitalizedCases",
    columnJP: "入院患者",
    columnDescription:
      "入院患者の病床使用率 = 入院者数(入院確定者数を含む) ÷ 確保病床数\n確保病床数とは: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
    currentPhase: "hospitalizedCasesPhase",
    finalPhase: "hospitalizedCasesMaxPhase",
    indicators: [
      {
        indicator: "hospitalizedCasesUTE",
        headerLabel: "入院患者の病床使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "hospitalizedCases",
        headerLabel: "入院患者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "hospitalizedCasesCap",
        headerLabel: "確保病床数",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },

  {
    column: "severeCases",
    columnJP: "重症入院患者",
    columnDescription:
      "重症入院患者の病床使用率 = 重症入院患者数 ÷ (重症患者用の)確保病床数\n確保病床数とは: 患者の発生/受入れ要請があれば、即時患者受入れることを医療機関と調整している病床",
    currentPhase: "severeCasesPhase",
    finalPhase: "severeCasesMaxPhase",
    indicators: [
      {
        indicator: "severeCasesUTE",
        headerLabel: "重症入院患者の病床使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "severeCases",
        headerLabel: "重症入院患者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "severeCasesCap",
        headerLabel: "確保病床数",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },
  {
    column: "atHotelCases",
    columnJP: "宿泊療養者",
    columnDescription:
      "宿泊療養者の居室使用率 = 宿泊療養者 ÷ 確保居室数\n確保居室数とは: 借り上げ/協定などで確保しているホテルなど宿泊施設の居室数",
    currentPhase: "atHotelCasesPhase",
    finalPhase: "atHotelCasesMaxPhase",
    indicators: [
      {
        indicator: "atHotelCasesUTE",
        headerLabel: "宿泊療養者の居室使用率",
        formatter: value => `${Math.floor(100 * value)}%`,
        range: 1,
        barStyle: [],
      },
      {
        indicator: "atHotelCases",
        headerLabel: "宿泊療養者数",
        formatter: value => `${value.toLocaleString()}人`,
        range: 2000,
        barStyle: ["isBar"],
      },
      {
        indicator: "atHotelCasesCap",
        headerLabel: "確保居室数",
        formatter: value => `${value.toLocaleString()}床`,
        range: 2000,
        barStyle: ["isBar"],
      },
    ],
  },
]
