import React, { useState } from "react"
import { graphql } from "gatsby"
import { HomePageQuery } from "../../types/graphql-types"

import Layout from "../components/Layout"
import { ColumnBox } from "../components/ColumnBox"
import { Dashboard, DashboardData } from "../components/Dashboard"
import { COLUMN_SELECTION, COLUMN_PROPS, ColumnProperty } from "../constants"
import "../styles/bulma.scss"

import * as d3Array from "d3-array"
import { timeFormat } from "d3-time-format"

const formatYMD = timeFormat("%Y年%-m月%-d日")

type Props = {
  data: HomePageQuery
}

const Home: React.FC<Props> = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState<
    ColumnProperty["column"]
  >(COLUMN_SELECTION.hospitalized)

  const latestDate = new Date(data.current.nodes[0].updateDate)

  let selectedColumnProps = COLUMN_PROPS.find(
    element => element.column === selectedColumn
  ) as ColumnProperty

  // set react-table data
  const dashboardData: DashboardData[] = data.current.nodes.map(
    currentRecord => {
      return {
        entity: currentRecord.prefectureNameJP,
        phase: {
          current: currentRecord[selectedColumnProps.currentPhase],
          max: currentRecord[selectedColumnProps.finalPhase],
        },
        indicators: selectedColumnProps.indicators.map(prop => ({
          indicator: currentRecord[prop.indicator],
          trend: data.trend.nodes
            .filter(
              node => node.prefectureNameJP === currentRecord.prefectureNameJP
            )
            .map(trendRecord => ({
              date: new Date(trendRecord.updateDate),
              value: trendRecord[prop.indicator],
            })),
        })),
      }
    }
  )

  const maxRange = selectedColumnProps?.indicators.map(indicator =>
    d3Array.max(data.current.nodes.map(e => e[indicator.indicator]))
  )

  const schema = {
    indicators: selectedColumnProps?.indicators.map((indicator, index) => ({
      ...indicator,
      range: index === 0 ? 1 : maxRange[index],
    })),
    trendLabel: "過去8週間",
  }

  return (
    <Layout
      headerProps={{
        title: "新型コロナ感染症 病床使用状況",
      }}
    >
      <div className="columns">
        <ColumnBox heading="このページについて">
          <p>
            日本国内の新型コロナ感染症の病床使用状況をまとめたダッシュボードです。
            都道府県ごとに可視化しています。
          </p>
          <p>
            データソースは厚生労働所発表の
            <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html">
              療養状況等及び入院患者受入病床数等に関する調査
            </a>
            。
            <a href="https://github.com/kj002/covid19-open-data/tree/master/data/covid19">
              こちら
            </a>
            からcsv/json形式で利用可能です。
          </p>
        </ColumnBox>
      </div>
      <div className="columns">
        <ColumnBox heading="指標について">
          {selectedColumnProps?.columnDescription
            .split("\n")
            .map((line, key) => (
              <span key={key}>
                {line}
                <br />
              </span>
            ))}
        </ColumnBox>
      </div>
      <nav className="level mb-0 pb-0">
        <div className="level-left">
          <div className="level-item">
            <div className="heading">
              <span className="tag is-info is-light is-medium">{`${formatYMD(
                latestDate
              )} 時点`}</span>
            </div>
          </div>
          <div className="level-item">
            <div className="heading">
              <div className="tag is-info is-light is-medium ml-1 mr-1">
                表示中:
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    value={selectedColumn}
                    onChange={event => setSelectedColumn(event.target.value)}
                  >
                    {COLUMN_PROPS.map((element, index) => (
                      <option key={index} value={element.column}>
                        {element.columnJP}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Dashboard schema={schema} data={dashboardData} />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  fragment fragmentName on JapanPrefectureMedicalTreatmentJson {
    prefectureNameJP
    updateDate
    bedCurrentPhase
    bedFinalPhase
    bedUtilizationRate
    hosipitalized
    bedCapacity
    severeCaseBedCurrentPhase
    severeCaseBedFinalPhase
    severeCaseBedUtilizationRate
    severeCase
    severeCaseBedCapacity
    accomondationCurrentPhase
    accomondationFinalPhase
    accomondationRoomUtilizationRate
    accomondationRoomCapacity
    accomondated
  }

  query HomePage {
    pref: allJapanPrefectureMedicalTreatmentJson {
      distinct(field: prefectureNameJP)
    }
    current: allJapanPrefectureMedicalTreatmentJson(
      limit: 47
      sort: { fields: [updateDate], order: DESC }
    ) {
      nodes {
        ...fragmentName
      }
    }
    trend: allJapanPrefectureMedicalTreatmentJson(
      limit: 376
      sort: { fields: updateDate, order: DESC }
    ) {
      nodes {
        ...fragmentName
      }
    }
  }
`
