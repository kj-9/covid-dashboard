import React, { useState } from "react"
import { graphql } from "gatsby"
import "../styles/bulma.scss"

import Layout from "../components/Layout"
import { Dashboard, DashboardData } from "../components/Dashboard"

import * as d3Array from "d3-array"
import { timeFormat } from "d3-time-format"

import { HomePageQuery } from "../../types/graphql-types"

import { COLUMN_SELECTION, COLUMN_PROPERTIES } from "../constants"

const formatYMD = timeFormat("%Y年%-m月%-d日")
const formatMD = timeFormat("%-m月%-d日")

type Props = {
  data: HomePageQuery
}

const Home: React.FC<Props> = ({ data }) => {
  // get data from page query
  const rawData = data.allJapanPrefectureMedicalTreatmentJson.nodes

  //check number of prefectures in data
  const setPrefs = new Set(rawData.map(node => node.prefectureNameJP))
  if (setPrefs.size !== 47)
    throw Error("number of unique prefecture is not 47.")

  // get latest data in data
  const latestDate = new Date(d3Array.max(rawData, node => node.updateDate))

  const [selectedColumn, setSelectedColumn] = useState(
    COLUMN_SELECTION.bedUtilizationRate
  )

  let selectedColumnProperty = COLUMN_PROPERTIES.find(
    element => element.column === selectedColumn
  )

  // set react-table data
  const dashboardData: DashboardData[] = Array.from(setPrefs)
    .map(pref => {
      const prefArray = rawData
        .filter(element => element.prefectureNameJP === pref)
        .sort((a, b) => d3Array.descending(a.updateDate, b.updateDate))

      return {
        ...prefArray.map(element => ({
          entity: element.prefectureNameJP,
          phase: {
            current: element[selectedColumnProperty.currentPhase],
            max: element[selectedColumnProperty.finalPhase],
            label: `現在のレベル:${
              element[selectedColumnProperty.currentPhase]
            }\n最大レベル:${element[selectedColumnProperty.finalPhase]}`,
          },
          indicator: {
            value: element[selectedColumn],
            label: `${Math.floor(100 * element[selectedColumn])}%`,
          },
        }))[0],
        trend: prefArray.slice(0, 8).map(element => ({
          date: new Date(element.updateDate),
          value: element[selectedColumn],
          label: `${formatMD(new Date(element.updateDate))}時点\n${Math.floor(
            100 * element[selectedColumn]
          )}%`,
        })),
      }
    })
    // need to sort whole array, and then nested array.
    // otherwise, nested array's order will be reset.
    // need to fix in the future.
    .sort((a, b) => d3Array.descending(a.indicator.value, b.indicator.value))
    .map(element => {
      const { entity, phase, indicator, trend } = element
      return {
        entity: entity,
        phase: phase,
        indicator: indicator,
        trend: trend.sort((a, b) => d3Array.ascending(a.value, b.value)),
      }
    })

  return (
    <Layout
      headerProps={{
        title: "新型コロナ感染症ダッシュボード",
      }}
    >
      <div className="container ml-4 mt-4">
        <div className="columns">
          <div className="column">
            <div className="box has-background-grey-lighter">
              <div className="heading">
                <span className="tag is-info is-light is-medium">
                  このダッシュボードについて
                </span>
              </div>

              <p>
                日本国内の新型コロナ感染症・療養状況についてのダッシュボードです。
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
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div
              className="box has-background-grey-lighter"
              css={{ height: "100%" }}
            >
              <div className="heading">
                <span className="tag is-info is-light is-medium">
                  表示中の指標
                </span>
              </div>
              <div className="field">
                <div className="control">
                  <div className="select">
                    <select
                      value={selectedColumn}
                      onChange={event => setSelectedColumn(event.target.value)}
                    >
                      {COLUMN_PROPERTIES.map((element, index) => (
                        <option key={index} value={element.column}>
                          {element.column_jp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div
              className="box has-background-grey-lighter"
              css={{ height: "100%" }}
            >
              <div className="heading">
                <span className="tag is-info is-light is-medium">
                  指標について
                </span>
              </div>

              {selectedColumnProperty?.column_description
                .split("\n")
                .map((line, key) => (
                  <span key={key}>
                    {line}
                    <br />
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box">
              <span className="tag is-info is-light is-medium">
                {`${formatYMD(latestDate)} 時点`}
              </span>

              <div className="table-container">
                <Dashboard
                  className="table"
                  header={{
                    entity: "都道府県",
                    indicator: selectedColumnProperty.column_jp,
                    trend: "過去8週間",
                  }}
                  data={dashboardData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query HomePage {
    allJapanPrefectureMedicalTreatmentJson {
      nodes {
        prefectureNameJP
        updateDate
        bedCurrentPhase
        bedFinalPhase
        bedUtilizationRate
        severeCaseBedCurrentPhase
        severeCaseBedFinalPhase
        severeCaseBedUtilizationRate
        accomondationCurrentPhase
        accomondationFinalPhase
        accomondationRoomUtilizationRate
      }
    }
  }
`
