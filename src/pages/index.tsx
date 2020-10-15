import React from "react"
import { graphql } from "gatsby"
import "../styles/bulma.scss"

import Layout from "../components/layout"
import { Table } from "../components/Table"
import { Cell } from "../components/Cell/Cell"
import { CellAxis } from "../components/Cell/CellAxis"
import { CellBar } from "../components/Cell/CellBar"
import { CellSparkline } from "../components/Cell/CellSparkline"

import { descending } from "d3-array"
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
  const latestDate = new Date(rawData.map(node => node.update_date)[0])

  // set react-table data
  const tableData = React.useMemo(
    () =>
      rawData.sort((a, b) =>
        descending(a.pref_patients_beds_ratio, b.pref_patients_beds_ratio)
      ),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "都道府県",
        columns: [
          {
            accessor: "pref_name_jp",
          },
        ],
      },
      {
        Header: "ベッド占有率",
        columns: [
          {
            accessor: "pref_patients_beds_ratio",
            Header: CellAxis,
            Cell: CellBar,
          },
          {
            id: "value_pref_patients_beds_ratio",
            accessor: "pref_patients_beds_ratio",
            Cell: ({ value }) => (
              <Cell textAlign="right">{`${Math.floor(100 * value)}%`}</Cell>
            ),
          },
          {
            id: "trend_pref_patients_beds_ratio",
            accessor: "last_1w",
            Header: "過去１週間",
            Cell: ({ value }) => (
              <CellSparkline
                scale={"time"}
                domain={{ y: [0, 1] }}
                data={value.map(element => ({
                  x: element.update_date,
                  y: element.pref_patients_beds_ratio,
                }))}
              />
            ),
          },
        ],
      },
    ],
    []
  )

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
              <Table<HomePageQuery["allCovidPatientsJson"]["nodes"][0]>
                className="table"
                columns={columns}
                data={tableData}
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
