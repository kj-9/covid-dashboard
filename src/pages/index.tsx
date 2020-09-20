import React from "react"
import { graphql } from 'gatsby';
import "../styles/bulma.scss";

import Layout from '../components/layout';
import Table from '../components/Table';
import { VictoryAxis, VictoryBar, VictoryContainer } from 'victory';

import * as scale from 'd3-scale';
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

  const cellWidth = 200;
  const cellHeight = 20;
  const cellPadding = { left: 10, right: 14 };

  const columns = React.useMemo(
    () => [
      {
        Header: '都道府県',
        columns: [
          {
            accessor: 'pref_name_jp',
          }
        ]
      },
      {
        Header: 'ベッド占有率',
        columns: [
          {
            accessor: 'pref_patients_beds_ratio',
            Header: () =>
                <VictoryAxis
                  width={cellWidth}
                  height={cellHeight}
                  padding= {cellPadding}
                  domain={{ y: [0, 1] }}
                  orientation="top"
                  offsetY={19}
                  dependentAxis
                  tickFormat={(t) => `${100 * t}%`}
                  style={{
                    axis: { stroke: 'transparent' },
                    axisLabel: { color: 'grey' },
                    ticks: { size: 5, stroke: 'gray' },
                    tickLabels: { fontSize:11, padding:0, fill: 'grey' },
                    grid: { stroke: 'transparent' }
                  }}
                  containerComponent={<VictoryContainer width={cellWidth} responsive={false}/>}
                  />
,
            Cell: ({ value }) =>
              <VictoryBar
                width={cellWidth}
                height={cellHeight}
                padding= {cellPadding}
                domain={{ y: [0, 1] }}
                data={[{ x: "test", y: value }]}
                barRatio={1}
                horizontal
                alignment={"middle"}
                style={{
                  data: { fill: scale.scaleLinear().range(["#ffffff", "#ffa815", "#ff3939", "#a52323"]).domain([0, 1])(scale.scaleThreshold().domain([0, 0.25, 0.5, 0.75, 1]).range([0, 0.25, 0.5, 0.75, 1])(value)) }
                }}                
                containerComponent={<VictoryContainer width={cellWidth} responsive={false}/>}
                />
          },
          {
            accessor: 'pref_patients_beds_ratio',
            id: 'value_pref_patients_beds_ratio',
            Cell: ({ value }) => `${Math.floor(100 * value)}%`
          }
        ]
      },
    ],
    []
  )

  return (
    <Layout>
      <div className="columns ml-1">
        <div className="column mt-2">
          <h1 className="title">{"ベッド占有率"}</h1>
          <h2 className="subtitle is-6">{'(患者数/対策ベッド数) :' + formatDate(latestDate) + "時点"}</h2>
          <div className="columns">
            <div className="column">
              <Table className='table' columns={columns} data={tableData} />
            </div>
          </div>
        </div>
      </div>
    </Layout >
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