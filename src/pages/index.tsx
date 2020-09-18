import React from "react"
import { graphql } from 'gatsby';
import "../styles/bulma.scss";

import Layout from '../components/layout';
import Table from '../components/Table';
import { VictoryAxis, VictoryBar, VictoryTheme } from 'victory';

import { descending } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const formatDate = timeFormat("%Y/%m/%d");

export default function Home({ data }) {

  // get data from page query
  const rawData = data.allCovidPatientsCsv.nodes;

  //check number of prefectures in data
  const setPrefs = new Set(rawData.map(node => node.pref_name_jp));
  if (setPrefs.size !== 47) throw Error("number of unique prefecture is not 47.")

  // get latest data in data
  const latestDate = new Date(rawData.map(node => node.update_date)[0])

  // set react-table data
  const tableData = React.useMemo(
    () => rawData.sort((a, b) => descending(a.pref_patients_beds_ratio, b.pref_patients_beds_ratio)),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        accessor: 'pref_name_jp', // accessor is the "key" in the data
      },
      {
        accessor: 'pref_patients_beds_ratio',
        Header: () =>
          <VictoryAxis
            orientation="top"
            dependentAxis
            height={50}
            domain={{ y: [0, 1] }}
            label={"患者数/ベッド数"}
            theme={VictoryTheme.material}
            tickFormat={ (t) => `${100 * t}%` }
            style={{
              axis: { padding: 10 },
              axisLabel: { fontSize: 14, padding: 30 },
              tickLabels: { fontSize: 10 },
              grid: {stroke: 'transparent'}
            }}

          />,
        Cell: ({ value }) =>
          <VictoryBar
            data={[{ x: "test", y: value }]}
            domain={{ y: [0, 1] }}
            horizontal
            alignment={"middle"}
            domainPadding={{ x: [10, 0] }}
            height={30}
            style={{ data: { fill: "#c43a31" } }}

          />
      },
    ],
    []
  )


  return (
    <Layout>
      <div className="columns is-centered has-background-light px-4">
        <div className="column">
          <h2 className="subtitle is-6">{formatDate(latestDate) + "時点"}</h2>
          <Table columns={columns} data={tableData} />
        </div>
      </div>
    </Layout>
  )
}


export const pageQuery = graphql`
query HomePageQuery {
  allCovidPatientsCsv(sort: {order: DESC, fields: update_date}, limit: 47) {
    nodes {
      update_date
      pref_name_jp
      pref_n_patients
      pref_n_current_patients
      pref_n_current_heavy_patients
      pref_heavy_patients_beds_ratio
      pref_patients_beds_ratio
    }
  }
}
`