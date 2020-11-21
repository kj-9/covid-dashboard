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

  const selectedColumnProperty = COLUMN_PROPERTIES.find(
    element => element.column === selectedColumn
  )

  // set react-table data
  const dashboardData: DashboardData[] = Array.from(setPrefs).map(pref => {
    const prefArray = rawData
      .filter(element => element.prefectureNameJP === pref)
      .sort((a, b) => d3Array.descending(a.updateDate, b.updateDate))

    return {
      ...prefArray.map(element => ({
        entity: element.prefectureNameJP,
        indicator: element[selectedColumn],
      }))[0],
      trend: prefArray
        .slice(0, 4)
        .map(element => ({
          date: element.updateDate,
          indicator: element[selectedColumn],
        }))
        .sort((a, b) => d3Array.ascending(a.date, b.date)),
    }
  })

  console.log(dashboardData)

  return (
    <Layout
      headerProps={{
        title: "新型コロナ感染症ダッシュボード",
        subtitle: "Japan Covid-19 Dashboard",
      }}
    >
      <div className="container ml-4 mt-4">
        <div className="columns">
          <div className="column is-narrow">
            <div className="box has-background-grey-lighter">
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
              {selectedColumnProperty?.column_description}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-narrow">
            <div className="box">
              <span className="tag is-info is-light is-medium">
                {`${formatYMD(latestDate)} 時点`}
              </span>

              <Dashboard
                className="table"
                entityLabel="都道府県"
                indicatorLabel={selectedColumnProperty.column_jp}
                indicatorFormatter={({ value }) =>
                  `${Math.floor(100 * value)}%`
                }
                trendLabel="過去4週間"
                trendTooltipFormatter={({ datum }) =>
                  `${formatMD(new Date(datum.x))}時点\n${Math.floor(
                    100 * datum.y
                  )}%`
                }
                data={dashboardData}
              />
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
        testedPositive
        hosipitalized
        bedCurrentPhase
        bedFinalPhase
        bedCapacity
        bedUtilizationRate
        plannedBedCapacity
        severeCase
        severeCaseBedCurrentPhase
        severeCaseBedFinalPhase
        severeCaseBedCapacity
        severeCaseBedUtilizationRate
        plannedSevereCaseBedCapacity
        accomondated
        accomondationCurrentPhase
        accomondationFinalPhase
        accomondationRoomCapacity
        accomondationRoomUtilizationRate
        plannedaccomondationRoomCapacity
        atHome
        atWelfareFacility
        unconfirmed
      }
    }
  }
`
