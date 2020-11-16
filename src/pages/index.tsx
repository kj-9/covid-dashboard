import React, { useState } from "react"
import { graphql } from "gatsby"
import "../styles/bulma.scss"

import Layout from "../components/Layout"
import { Dashboard, DashboardData } from "../components/Dashboard"

import * as d3Array from "d3-array"
import { timeFormat } from "d3-time-format"

import { HomePageQuery } from "../../types/graphql-types"

import { COLUMN_SELECTION, COLUMN_PROPERTIES } from "../constants"

const formatDate = timeFormat("%Y/%m/%d")

type Props = {
  data: HomePageQuery
}

const Home: React.FC<Props> = ({ data }) => {
  // get data from page query
  const rawData = data.allCovidPatientsJson.nodes

  //check number of prefectures in data
  const setPrefs = new Set(rawData.map(node => node.pref_name_jp))
  if (setPrefs.size !== 47)
    throw Error("number of unique prefecture is not 47.")

  // get latest data in data
  const latestDate = new Date(d3Array.max(rawData, node => node.update_date))

  const [selectedColumn, setSelectedColumn] = useState(
    COLUMN_SELECTION.pref_patients_beds_ratio
  )

  const selectedColumnProperty = COLUMN_PROPERTIES.find(
    element => element.column === selectedColumn
  )

  // set react-table data
  const dashboardData: DashboardData[] = rawData
    .sort((a, b) => d3Array.descending(a[selectedColumn], b[selectedColumn]))
    .map(element => ({
      entity: element.pref_name_jp,
      indicator: element[selectedColumn],
      trend: element.last_1w?.map(e => ({
        date: e?.update_date,
        indicator: e[selectedColumn],
      })),
    }))

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
                {`${formatDate(latestDate)} 時点`}
              </span>

              <Dashboard
                className="table"
                entityLabel="都道府県"
                indicatorLabel={selectedColumnProperty?.column_jp}
                indicatorFormatter={({ value }) =>
                  `${Math.floor(100 * value)}%`
                }
                trendLabel="過去1週間"
                trendTooltipFormatter={({ datum }) =>
                  `${Math.floor(100 * datum.y)}%`
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
    allCovidPatientsJson {
      nodes {
        update_date
        pref_name_jp
        pref_heavy_patients_beds_ratio
        pref_patients_beds_ratio
        last_1w {
          pref_heavy_patients_beds_ratio
          pref_patients_beds_ratio
          update_date
        }
      }
    }
  }
`
