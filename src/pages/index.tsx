import React from "react"
import { graphql } from "gatsby"
import "../styles/bulma.scss"

import Layout from "../components/Layout"
import { Dashboard, DashboardData } from "../components/Dashboard"

import * as d3Array from "d3-array"
import { timeFormat } from "d3-time-format"

import { HomePageQuery } from "../../types/graphql-types"

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

  // set react-table data
  const dashboardData: DashboardData[] = rawData
    .sort((a, b) =>
      d3Array.descending(a.pref_patients_beds_ratio, b.pref_patients_beds_ratio)
    )
    .map(element => ({
      entity: element.pref_name_jp,
      indicator: element.pref_patients_beds_ratio,
      trend: element.last_1w?.map(e => ({
        date: e?.update_date,
        indicator: e?.pref_patients_beds_ratio,
      })),
    }))

  return (
    <Layout
      headerProps={{
        title: "コロナ感染状況ダッシュボード",
        subtitle: "Japan Covid-19 dashboard",
      }}
    >
      <div className="columns ml-1">
        <div className="column mt-2">
          <h1 className="title is-4">{"ベッド占有率"}</h1>
          <h2 className="subtitle is-6">
            {"(患者数/対策ベッド数) :" + formatDate(latestDate) + "時点"}
          </h2>
          <div className="columns">
            <div className="column">
              <Dashboard
                className="table"
                entityLabel="都道府県"
                indicatorLabel="ベッド占有率"
                indicatorFormatter={({ value }) =>
                  `${Math.floor(100 * value)}%`
                }
                trendLabel="過去１週間"
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
        pref_n_patients
        pref_n_current_patients
        pref_n_current_heavy_patients
        pref_heavy_patients_beds_ratio
        pref_patients_beds_ratio
        last_1w {
          pref_patients_beds_ratio
          update_date
        }
      }
    }
  }
`
